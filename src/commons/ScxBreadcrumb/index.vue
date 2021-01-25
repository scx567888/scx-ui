<template>
  <el-breadcrumb>
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in nowRouteList" :key="index" :to="item">
        {{ $t('route.' + item.name) }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from "vue-router";
import "./index.css";

export default {
  name: 'scx-breadcrumb',
  setup(props) {
    const route = useRoute();
    const nowRouteList = computed(() => route.matched.filter(item => item.meta && item.name));
    return {
      nowRouteList
    }
  }
}
</script>