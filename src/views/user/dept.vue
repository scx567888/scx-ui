<template>
  <div style="padding: 10px;display: flex">
    <div style="width: 100%;">
      <el-input v-model="filterText" placeholder="输入部门关键字进行过滤"></el-input>
      <el-tree ref="deptTree"
               :data="deptData"
               :expand-on-click-node="false"
               :filter-node-method="filterNode"
               :render-content="renderContent"
               class="filter-tree"
               default-expand-all
               draggable
               node-key="id"
               @node-click="toEdit"
               @node-drop="handleDrop">
      </el-tree>
    </div>
    <div style="width: 100%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="排序字段">
          <el-input v-model="form.deptOrder"></el-input>
        </el-form-item>
        <el-form-item label="父级部门">
          <el-input v-model="form.parentDeptName" :readonly="true"></el-input>
        </el-form-item>
        <el-tree v-show="showPermTree"
                 ref="permTree"
                 v-permission="['*','Role:list']"
                 :data="permData"
                 :default-expanded-keys="[-1]"
                 :render-content="renderContentPerm"
                 node-key="id"
                 show-checkbox>
        </el-tree>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="update">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {list2tree} from '/@/utils';
import request from "/@/utils/request";
import {computed, reactive, ref, watch} from "vue";
import {getPermTreeData} from "../../utils/permUtil";
import ScxIcon from "../../commons/ScxIcon/index.vue";
import {t} from "../../i18n";

export default {
  setup() {
    const list = ref([]);
    const form = reactive({
      id: '',
      parentId: '',
      perm: '',
      deptName: '',
      deptOrder: '',
      level: '',
      parentDeptName: '',
    });

    const filterText = ref('');
    const showPermTree = ref(true);
    const permData = ref(getPermTreeData());

    const deptData = computed(() => {
      return [{
        id: -1,
        roleName: '部门管理结构树',
        children: list2tree(list.value)
      }]
    });

    function getList() {
      request.post('/api/core/Dept/list', {}).then(response => {
        list.value = response.items;
      })
    }

    getList();
    watch(filterText, () => {
      this.$refs.roleTree.filter(val);
    });

    function filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    }

    function update() {
      let checkedNodes = this.$refs.permTree.getCheckedNodes(false, true);
      let perms = "";
      checkedNodes.forEach(tempNode => {
        if (tempNode.rank === undefined) {
          tempNode.rank = 0
        }
        perms += tempNode.id + "_" + tempNode.rank + ";";
      })
      this.form.perm = perms;
      request.put('/api/Dept', this.form).then(response => {
        const index = this.list.findIndex(d => d.id === response.items.id);
        this.list.splice(index, 1, response.items);
        const childrenTreeData = list2tree(this.list);
        this.deptData = [{
          id: -1,
          deptName: '部门管理结构树',
          children: childrenTreeData
        }]
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      })
    }

    function appendDept(node, data) {
      let parentId;
      let level;
      if (node.data.id != -1) {
        parentId = node.data.id;
        level = node.level + 1;
      } else {
        parentId = "0";
        level = "2";
      }
      request.post('/api/core/Dept', {
        id: null,
        deptName: "临时添加部门",
        deptOrder: "0",
        parentId: parentId,
        level: level
      }).then(response => {
        list.value.push(response.items);
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      })
    }

    function remove(node, data) {
      this.$confirm('此操作将永久删除部门及下属组织机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.delete('/api/Dept/' + data.id).then(response => {
          const index = this.list.findIndex(d => d.id === data.id);
          this.list.splice(index, 1);
          const childrenTreeData = list2tree(this.list);
          this.deptData = [{
            id: -1,
            deptName: '部门管理结构树',
            children: childrenTreeData
          }]
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

    function handleDrop(draggingNode, dropNode, dropType, ev) {
      let parentId;
      let deptOrder = draggingNode.data.deptOrder;
      let level;
      if (dropType === "inner") {
        parentId = dropNode.data.id;
        level = dropNode.level + 1;
      } else {
        if (dropNode.data.id == "-1") {
          this.getList();
          return;
        }
        parentId = dropNode.data.parentId;
        level = dropNode.level;
        if (dropType === "before") {
          deptOrder = Number(dropNode.data.deptOrder) + 1;
        } else {
          deptOrder = Number(dropNode.data.deptOrder) - 1;
        }
      }
      if (parentId === "-1" || !parentId) {
        parentId = "0";
      }
      this.form.deptName = draggingNode.data.deptName;
      this.form.deptOrder = deptOrder;
      this.form.id = draggingNode.data.id;
      this.form.parentId = parentId;
      this.form.level = level;
      if (parentId !== '0') {
        this.form.parentDeptName = this.$refs.deptTree.getNode(parentId).data.label;
      } else {
        this.form.parentDeptName = "顶级部门";
      }
      this.update();

    }

    function toEdit(node) {
      this.showTree = !node.children || node.children.length === 0;

      this.form.deptName = node.deptName;
      this.form.deptOrder = node.deptOrder;
      this.form.id = node.id;
      this.form.parentId = node.parentId;
      this.form.level = node.level;
      if (node.parentId && node.parentId != '0') {
        this.form.parentDeptName = this.$refs.deptTree.getNode(node.parentId).data.deptName;
      } else {
        this.form.parentDeptName = "顶级部门";
      }
      if (this.showTree) {
        const permList = node.perm.split(';');
        let permCheckIds = permList.map(permAndRank => {
          let permId = permAndRank.split('_')[0];
          let tempPremTreeNode = this.$refs.permTree.getNode(permId);
          if (tempPremTreeNode != null) {
            tempPremTreeNode.data.rank = permAndRank.split('_')[1]
          }
          return permId
        })
        const tree = this.$refs.permTree;
        tree.setCheckedKeys([])
        permCheckIds.forEach(p => {
          tree.setChecked(p, true, false)
        })
      }
    }

    //左侧显示角色的自定义模板
    function renderContent(h, {node, data, store}) {
      if (node.data.id != "-1") {
        return h('span', {class: "custom-tree-node", onClick: () => toEdit(data)}, [
          h('span', {}, data.deptName),
          h('span', {}, [h('el-button', {
            size: "mini", type: "text", style: "color:rgb(103, 194, 58)",
            onClick: (e) => {
              appendDept(node, data)
            }
          }, '添加'),
            h('el-button', {
              size: "mini", type: "text", style: "color:rgb(245, 108, 108)",
              onClick: (e) => {
                e.stopPropagation();
                remove(node, data)
              }
            }, '删除'),]),
        ]);

      } else {
        return h('span', {class: "custom-tree-node"}, [
          h('span', {class: 'dept-tree-head'}, data.deptName),
          h('el-button', {
            size: "mini", type: "text", style: "color:rgb(103, 194, 58)",
            onClick: (e) => {
              appendDept(node, data)
            }
          }, '添加'),
        ]);
      }
    }

    //右侧的权限树的自定义显示模板
    function renderContentPerm(h, {node, data, store}) {
      if (node.data.id === -1) {
        return h('span', {class: "custom-tree-node"}, [h('span', {class: 'role-tree-head'}, node.label)]);
      } else {
        const vNode = [];
        if (node.data.icon) {
          vNode.push(h(ScxIcon, {icon: node.data.icon}));
        }
        vNode.push(t('route.' + node.label));
        return h('span', {class: "custom-tree-node"}, [h('span', {}, vNode), h('input', {
          class: 'permInput',
          model: node.data.rank
        })]);
      }
    }

    return {deptData, form, permData, filterText, showPermTree, renderContentPerm, renderContent}

  }
};
</script>

<style lang="css">
.dept-tree-head {
  font-size: 14px;
  font-weight: 700;
  color: #606266;
}

.dark-theme .dept-tree-head {
  color: #e1e3e7;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.permInput {
  height: 20px;
  width: 30px;
  text-align: center;
}
</style>
