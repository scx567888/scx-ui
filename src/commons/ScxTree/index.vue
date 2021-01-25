<template>
  <div class="scx-tree">
    <el-input v-if="treeConfig.hasFilter"
              v-model="filterText"
              class="tree-filter-input"
              clearable
              placeholder="输入关键字进行过滤">
    </el-input>
    <el-tree ref="elTreeRef"
             :data="treeData"
             :default-expanded-keys="treeConfig.defaultExpandedKeys"
             :expand-on-click-node=false
             :filter-node-method="filterNode"
             :render-content="treeConfig.renderContent"
             :show-checkbox="treeConfig.hasCheckbox"
             node-key="id"
             @check="handleTreeCheck"
             @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script type="text/jsx">
import {list2tree} from '../../utils/index'
import request from "../../utils/request";
import {onMounted, reactive, ref, watch} from "vue";

export default {
  name: 'ScxTree',
  props: {
    type: {
      type: String,
      default: 'normal'//这个树是干啥的 两种 一种是普通的仅仅展示数据 另一种是作为一个 crud 的模块
    },
    //树的数据 (列表形式)
    scxTreeData: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    scxTreeConfig: {
      type: Object,
      required: true,
      default: () => {
      }
    },
    scxCrudItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup(props, context) {
    const elTreeRef = ref(null);

    const treeConfig = reactive({
      editShow: false,//添加 修改 删除 或恢复删除 时 右侧通知消息 显示的字段
      modelName: false,//实体类的名称  用于构建 Api 和国际化
      module: false,//实体类所属的模块用于构建 Api
      hasCheckbox: false,//是否有多选框
      hasFilter: true,//是否有过滤框
      defaultExpandedKeys: [-1],//默认展开节点 key
      buildUrl: false,//构建的 url
      labelProp: 'label',//显示的默认 字段名
      valueProp: 'id',//勾选节点时默认 字段名
      topLabel: 'ROOT',//顶级节点 名称
      renderContent: null,//渲染函数
      listApi: false,
      createApi: false,
      deleteApi: false,
      revokeDeleteApi: false,
      checkUniqueApi: false,
      updateApi: false,
      autoCompleteApi: false,
      batchDeleteApi: false,
      infoApi: false,
    });
    new function initTreeConfig() {
      Object.assign(treeConfig, props.scxTreeConfig);
      treeConfig.renderContent = props.scxTreeConfig.renderContent ? props.scxTreeConfig.renderContent :
          (h, {data}) => h("span", {class: "custom-tree-node"}, data[treeConfig.labelProp]);
      if (props.type === 'crud') {
        treeConfig.editShow = props.editShow ? props.editShow : props.scxCrudItems[0].prop;
        const baseCrudApi = '/api/' + treeConfig.module + '/' + treeConfig.modelName;
        treeConfig.listApi = props.listApi ? props.listApi : baseCrudApi + '/list';
        treeConfig.createApi = props.createApi ? props.createApi : baseCrudApi;
        treeConfig.deleteApi = props.deleteApi ? props.deleteApi : baseCrudApi + '/';
        treeConfig.revokeDeleteApi = props.revokeDeleteApi ? props.revokeDeleteApi : baseCrudApi + '/revokeDelete/';
        treeConfig.checkUniqueApi = props.checkUniqueApi ? props.checkUniqueApi : baseCrudApi + '/checkUnique';
        treeConfig.updateApi = props.updateApi ? props.updateApi : baseCrudApi;
        treeConfig.autoCompleteApi = props.autoCompleteApi ? props.autoCompleteApi : baseCrudApi + '/getAutoComplete/';
        treeConfig.batchDeleteApi = props.batchDeleteApi ? props.batchDeleteApi : baseCrudApi + '/batchDelete';
        treeConfig.infoApi = props.infoApi ? props.infoApi : baseCrudApi + '/';
      }
    };


    const filterText = ref('');
    const treeData = ref([]);


    //此处根据 不同数据来源进行获取树的数据源
    function initTreeData(scxTreeData) {
      if (treeConfig.buildUrl) {
        //根据url 获取数据
        request.post(treeConfig.buildUrl, {page: 1, limit: -1, sort: "desc", orderBy: "id"}).then(response => {
          treeData.value = [{
            id: -1,
            [treeConfig.labelProp]: treeConfig.topLabel,
            children: list2tree(response.items)
          }];
        });
      } else { //这里就通过 scxTreeData
        const needConvert = scxTreeData.length !== 0 && !scxTreeData[0].children;
        if (needConvert) {
          treeData.value = [{
            id: -1,
            [treeConfig.labelProp]: treeConfig.topLabel,
            children: list2tree(scxTreeData)
          }];
        } else {
          treeData.value = [{
            id: -1,
            [treeConfig.labelProp]: treeConfig.topLabel,
            children: scxTreeData
          }];
        }
      }
    }


    initTreeData(props.scxTreeData);
    watch(() => props.scxTreeData, (newVal, oldVal) => {
      initTreeData(newVal);
    })


    onMounted(() => {
      // this.checkedTree(this.value.split(','));
    })


    return {elTreeRef, treeConfig, filterText, treeData}

  }
  ,
  methods: {
    handleTreeCheck() {
      let res = this.$refs.scxTree.getCheckedNodes(true, false);
      var tempIds = [];
      res.forEach((item) => {
        tempIds.push(item[this.valueProp])
      })
      this.$emit('input', tempIds.join(','));
    },
    //构建树
    buildTree(buildList) {

    },
    //选中树
    checkedTree(checkedIds) {
      if (checkedIds != null && checkedIds.length > 0) {
        this.$refs.scxTree.setCheckedKeys(checkedIds);
      }
    },
    //todo 因为现在没有 label 属性了所以 搜索需要重新设计 暂时先这么用
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      var s = Object.values(data).filter(a => a !== -1)
      for (let i in s) {
        try {
          if (s[i].indexOf(value) !== -1) {
            return true
          }
        } catch (e) {

        }
      }
    },

    handleNodeClick(data, node) {
      this.$emit('handleNodeClick', data, node);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.scxTree.filter(val);
    },
    treeDataList(val) {
      this.buildTree(val)
    },
    value(newVal) {
      this.checkedTree(newVal.split(','))
    }
  },
}
</script>