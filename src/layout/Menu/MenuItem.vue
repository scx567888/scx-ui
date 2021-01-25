<template>

  <el-menu-item
      v-if="!item.hidden&&hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
      :index="resolveRoutePath(onlyOneChild.path)">
    <template v-slot:title>
      <scx-v2t :v-nodes="getIconAndTitle(onlyOneChild)"/>
    </template>
  </el-menu-item>

  <el-submenu v-else-if="!item.hidden" :index="resolveRoutePath(item.path)">
    <template v-slot:title>
      <scx-v2t :v-nodes="getIconAndTitle(item)"/>
    </template>
    <menu-item
        v-for="child in item.children"
        :key="child.path"
        :base-path="resolveRoutePath(child.path)"
        :item="child"
    />
  </el-submenu>

</template>

<script>
import {isExternal, resolvePath} from "../../utils";
import {t} from "../../i18n";
import {h, ref} from "vue";
import ScxIcon from "../../commons/ScxIcon/index.vue";

export default {
  name: 'menu-item',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const onlyOneChild = ref({meta: null});

    function hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        onlyOneChild.value = {...parent, path: '', noShowingChildren: true}
        return true
      }
      return false
    }

    function resolveRoutePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return props.basePath
      }

      return resolvePath(props.basePath, routePath);

    }

    function getIconAndTitle(nowItem) {
      const vNode = [];
      if (nowItem.icon) {
        vNode.push(h(ScxIcon, {icon: nowItem.icon, class: 'sub-el-icon'}))
      }
      vNode.push(t('route.' + nowItem.name))
      return vNode
    }

    return {hasOneShowingChild, onlyOneChild, resolveRoutePath, getIconAndTitle, t}
  }
}
</script>