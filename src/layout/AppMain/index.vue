<template>
  <section class="scx-main-content">

    <router-view v-slot="{ Component }">
      <transition :name="scxMaiContentTransform" mode="out-in">
<!--        <keep-alive :include="cachedViews">-->
          <component :is="Component" v-if="isAppMainAlive"/>
<!--        </keep-alive>-->
      </transition>
    </router-view>

  </section>
</template>

<script>
import {state} from "../../store";
import {computed, nextTick, watch,ref} from "vue";
import {useRoute} from "vue-router";
import "./index.css";

export default {
  name: 'AppMain',
  setup() {
    const route = useRoute();
    const cachedViews = computed(() => state.tagsView.cachedViews)
    const isAppMainAlive = ref(true);
    //todo 刷新有 bug
    watch(() => state.isAppMainAlive, () => {
      NProgress.start();
      isAppMainAlive.value = false;
      nextTick(() => {
        isAppMainAlive.value = true;
      }).then(r => {
        NProgress.done()
      })
    })
    const scxMaiContentTransform = computed(() => 'app-main-' + state.setting.mainTransitionAnimation);
    const key = computed(() => route.path);
    return {cachedViews, isAppMainAlive, scxMaiContentTransform, key};
  }
}
</script>
