<template>
  <div style="padding: 10px;display: flex">
    <div style="width: 100%;">
      <el-input v-model="filterText" placeholder="输入角色关键字进行过滤"></el-input>
      <el-tree ref="roleTree"
               :data="roleData"
               :expand-on-click-node="false"
               :filter-node-method="filterNode"
               :render-content="renderContent"
               class="filter-tree"
               default-expand-all
               draggable
               node-key="id"
               @node-drop="handleDrop">
      </el-tree>
    </div>
    <div style="width: 100%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="排序字段">
          <el-input v-model="form.roleOrder"></el-input>
        </el-form-item>
        <el-tree ref="permTree"
                 v-permission="['*','Dept:list']"
                 :data="permData"
                 :default-expanded-keys="[-1]"
                 :render-content="renderContentPerm"
                 node-key="id"
                 show-checkbox>
        </el-tree>
        <el-form-item style="text-align: center">
          <el-button :disabled="form.id===-1||form.id===''" type="primary" @click="update">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import {computed, reactive, ref, watch} from "vue";
import {list2tree} from "../../utils";
import {t} from "../../i18n";
import {getPermTreeData} from "../../utils/permUtil";
import ScxIcon from '../../commons/ScxIcon/index.vue'; //图标组件

export default {
  setup() {
    //角色列表数据
    const list = ref([]);
    const form = reactive({
      id: '',
      parentId: '',
      perm: '',
      roleName: '',
      roleOrder: '',
    });
    const filterText = ref('');
    const permData = getPermTreeData();

    const roleData = computed(() => {
      return [{
        id: -1,
        roleName: '角色详情',
        children: list2tree(list.value)
      }]
    });

    function getList() {
      request.post('/api/core/role/list', {}).then(response => {
        list.value = response.items;
      })
    }

    //左侧显示角色的自定义模板
    function renderContent(h, {node, data, store}) {
      if (node.data.id != "-1") {
        return h('span', {class: "custom-tree-node", onClick: () => toEdit(data)}, [
          h('span', {}, data.roleName),
          h('el-button', {
            size: "mini", type: "text", style: "color:rgb(245, 108, 108)",
            onClick: (e) => {
              e.stopPropagation();
              remove(node, data)
            }
          }, '删除'),
        ]);

      } else {
        return h('span', {class: "custom-tree-node"}, [
          h('span', {class: 'role-tree-head'}, data.roleName),
          h('el-button', {
            size: "mini", type: "text", style: "color:rgb(103, 194, 58)",
            onClick: (e) => {
              appendRole(node, data)
            }
          }, '添加'),
        ]);
      }
    }

    function appendRole(node, data) {
      request.post('/api/core/role', {
        id: null,
        roleName: "临时添加角色",
        roleOrder: '0',
        parentId: '0'
      }).then(response => {
        list.value.push(response.items);
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      })
    }

    //点击角色的时候
    function toEdit(data) {
      form.roleName = data.roleName;
      form.roleOrder = data.roleOrder;
      form.id = data.id;
      if (data.perm) {
        const permCheckedKeys = data.perm.split(";");
        this.$refs.permTree.setCheckedKeys([])
        permCheckedKeys.forEach(p => {
          this.$refs.permTree.setChecked(p, true, false)
        })
      } else {
        this.$refs.permTree.setCheckedKeys([])
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
        return h('span', {class: "custom-tree-node"}, [h('span', {}, vNode)]);
      }
    }


    getList();


    function filterNode(value, data) {
      if (!value) return true;
      return data.roleName.indexOf(value) !== -1;
    }

    function update() {
      let checkedNodes = this.$refs.permTree.getCheckedNodes(false, true);
      this.form.perm = checkedNodes.filter(item => item.id !== -1).map(item => item.id).join(';');
      request.put('/api/Role', this.form).then(response => {
        this.getList()
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      })
    }

    function remove(node, data) {
      this.$confirm('此操作将永久删除角色及其所拥有的权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.delete('/api/Role/' + data.id, {}).then(response => {
          const index = this.list.findIndex(d => d.id === data.id);
          this.list.splice(index, 1);
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

    //禁止拖到子节点
    function handleDrop(draggingNode, dropNode, dropType, ev) {
      let roleOrder = draggingNode.data.roleOrder;
      if (dropType === "inner") {
        this.getList();
      } else {
        if (dropNode.data.id === -1) {
          this.getList();
          return;
        }
        if (dropType === "before") {
          roleOrder = Number(dropNode.data.roleOrder) + 1;
        } else {
          roleOrder = Number(dropNode.data.roleOrder) - 1;
        }
        this.form.roleName = draggingNode.data.roleName;
        this.form.roleOrder = roleOrder;
        this.form.id = draggingNode.data.id;
        this.update();
        this.getList();
      }
    }

    watch(filterText, () => {
      this.$refs.roleTree.filter(val);
    });

    return {form, roleData, renderContent, permData, renderContentPerm};
  }

};
</script>

<style lang="css">
.role-tree-head {
  font-size: 14px;
  font-weight: 700;
  color: #606266;
}

.dark-theme .role-tree-head {
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
</style>
