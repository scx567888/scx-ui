<template>
  <el-select v-model="selectValue"
             :placeholder="placeholder"
             multiple
             @remove-tag="handleRemoveTag">
    <el-option :value="selectValue" style="width: 100%;height: 100%;background-color: transparent;padding:0 5px">
      <el-tree ref="selectTree" :data="treeData"
               :default-expanded-keys="defaultExpandedKeys"
               :render-content="TreeRenderContent" :show-checkbox="!this.singleChoice"
               node-key="id" @check="handleTreeCheck">
      </el-tree>
    </el-option>
    <el-option v-for="item in tempOption" v-show="false" :key="item[valueProp]" :label="item[labelProp]"
               :value="item[valueProp]">
    </el-option>
  </el-select>
</template>

<script type="text/jsx">
import {list2tree} from "../../utils";
import request from "/@/utils/request";

export default {
  name: "scx-tree-select",
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    //构建整个树的 url
    buildUrl: {
      type: String,
      default: ''
    },
    labelProp: {
      type: String,
      default: 'label'
    },
    valueProp: {
      type: String,
      default: 'id'
    },
    singleChoice: {
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => [-1]
    },
  },
  data() {
    return {
      selectValue: [],
      treeData: [],
      tempOption: []
    }
  },
  methods: {
    handleTreeCheck() {
      let res = this.$refs.selectTree.getCheckedNodes(true, false);
      let tempTreeCheckNode = [];
      res.forEach((item) => {
        tempTreeCheckNode.push(item[this.valueProp])
      })
      this.selectValue = tempTreeCheckNode;
    },
    handleRemoveTag(removeTag) {
      let showTag = this.selectValue.filter(item => item !== removeTag);
      this.$refs.selectTree.setCheckedKeys(showTag);
    },
    //构建树
    buildTree(buildList) {
      this.treeData = [{
        id: -1,
        [this.labelProp]: '全选',
        children: list2tree(buildList)
      }];
    },
    TreeRenderContent(h, {data}) {
      return h('span', {
        onClick: () => {
          this.treeClick(data)
        }, class: 'custom-tree-node'
      }, data[this.labelProp])

    },
    treeClick(data) {
      if (this.singleChoice) {
        if (data.children === undefined) {
          this.selectValue = [data[this.valueProp]];
        }
      }
    }
  },
  created() {
    //根据url 获取数据
    request.post(this.buildUrl, {page: 1, limit: -1, sort: "desc", orderBy: "id"}).then(response => {
      this.buildTree(response.items)
      this.tempOption = response.items
      let tempArr = [];
      this.value.split(',').forEach((item) => {
        if (item !== '') {
          tempArr.push(Number.parseInt(item))
        }
      })
      this.$refs.selectTree.setCheckedKeys(tempArr);
      this.selectValue = tempArr
      if (this.selectValue.length === 0) {
        this.$emit('clear');
      }
    });
  },
  watch: {
    value(newVal) {
      let tempArr = [];
      newVal.split(',').forEach((item) => {
        if (item !== '') {
          tempArr.push(Number.parseInt(item))
        }
      })
      this.$refs.selectTree.setCheckedKeys(tempArr);
      this.selectValue = tempArr
      if (this.selectValue.length === 0) {
        this.$emit('clear');
      }
    },
    selectValue(newVal) {
      this.$emit('input', newVal.join(','));
    }
  }
}
</script>