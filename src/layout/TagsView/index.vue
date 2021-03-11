<template>
  <transition name="scx-height-compress">
    <div v-show="needTagsView&&layoutMode!=='horizontal'" class="scx-main-tags-view">
      <div ref="tagsViewRef" class="tags-view-wrapper" @wheel.prevent="handleScroll">
        <router-link v-for="(tag,i) in visitedViews"
                     :key="tag.path"
                     :ref="el => { if (el) tagRef[i] = el }"
                     :class="isActive(tag)?'active':''"
                     :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                     class="tags-view-item"
                     tag="div"
                     @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
                     @contextmenu.prevent="openMenu(tag,$event)">
          {{ $t('route.' + tag.title) }}
          <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
        </router-link>
        <!-- flex 布局最后一个元素 margin-right 无效 此处用空白div 代替 -->
        <span style="width: 10px;flex-shrink: 0;height: 5px;"></span>
      </div>
    </div>
  </transition>
</template>

<script>
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {t} from '../../i18n'

import {reloadAppMain, state} from "../../store";
import {delAllViews} from "../../utils/tagViewUtil";
import {useRoute, useRouter} from "vue-router";
import {showContextMenu} from '../../commons/ScxContextMenu'
import './index.css'

const tagAndTagSpacing = 4;// tagAndTagSpacing
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const tagRef = ref([])


    const tagsViewRef = ref(null);
    const visible = ref(false);
    const affixTags = ref([]);

    const visitedViews = computed(() => state.tagsView.visitedViews);
    const routes = computed(() => state.permission.routes);
    const layoutMode = computed(() => state.setting.layoutMode);
    const needTagsView = computed(() => state.setting.tagsView);


    watch(route, (newVal, oldVal) => {
      addTags()
      moveToCurrentTag()
    })

    watch(visible, (newVal, oldVal) => {
      if (value) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    });


    onMounted(() => {
      initTags()
      addTags()
    })


    function isActive(e) {
      return e.path === route.path
    }

    function isAffix(tag) {
      return tag.affix
    }

    function filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = basePath + "" + route.path
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: {...route.meta}
          })
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }

    function initTags() {
      const tempAffixTags = affixTags.value = filterAffixTags(routes.value)
      for (const tag of tempAffixTags) {
        // Must have tag name
        if (tag.name) {
          addVisitedView(tag)
        }
      }
    }

    function addTags() {
      const {name} = route
      if (name) {
        addView(route)
      }
      return false
    }


    //移动到当前标签
    function moveToCurrentTag() {
      const tags = tagRef.value
      console.log(tagRef)
      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === route.path) {
            moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== route.fullPath) {
              updateVisitedView(route)
            }
            break
          }
        }
      })
    }


    //刷新选择的标签页
    function refreshSelectedTag(view) {
      delCachedView(view).then(() => {
        reloadAppMain();
      })
    }

    //关闭选择的标签页
    function closeSelectedTag(view) {
      delView(view).then(({visitedViews}) => {
        if (isActive(view)) {
          toLastView(visitedViews, view)
        }
      })
    }

    //关闭其他标签页
    function closeOthersTags(tag) {
      router.push(tag)

      delOthersViews(tag).then(() => {
        moveToCurrentTag()
      })
    }

    //关闭所有标签页
    function closeAllTags(view) {
      delAllViews().then(({visitedViews}) => {
        if (affixTags.value.some(tag => tag.path === view.path)) {
          return
        }
        toLastView(visitedViews, view)
      })
    }

    function toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          router.replace({
            path: '/redirect', query: {
              path: view.fullPath + ''
            }
          })
        } else {
          router.push('/')
        }
      }
    }

    function openMenu(tag, e) {
      showContextMenu(e, [{
        label: t('tagsView.refresh'),
        callback: () => refreshSelectedTag(tag)
      }, {
        label: t('tagsView.close'),
        hidden: isAffix(tag),
        callback: () => closeSelectedTag(tag)
      }, {
        label: t('tagsView.closeOthers'),
        callback: () => closeOthersTags(tag)
      }, {
        label: t('tagsView.closeAll'),
        callback: () => closeAllTags()
      }])
    }

    function closeMenu() {
      this.visible = false
    }

    function handleScroll(e) {
      closeMenu()
      const $scrollWrapper = tagsViewRef.value
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + e.wheelDelta
    }

    function moveToTarget(currentTag) {
      const $containerWidth = tagsViewRef.value.offsetWidth
      const $scrollWrapper = tagsViewRef.value
      const tagList = tagRef.value

      let firstTag = null
      let lastTag = null

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }

    function addView(view) {
      addVisitedView(view)
      addCachedView(view)
    }


    function addVisitedView(view) {
      if (state.tagsView.visitedViews.some(v => v.path === view.path)) return
      state.tagsView.visitedViews.push(
          Object.assign({}, view, {
            title: view.name || 'no-name'
          })
      )
    }

    function delCachedView(view) {
      return new Promise(resolve => {
        const index = state.tagsView.cachedViews.indexOf(view.name)
        index > -1 && state.tagsView.cachedViews.splice(index, 1)
        resolve([...state.tagsView.cachedViews])
      })
    }

    function delOthersViews(view) {
      return new Promise(resolve => {
        delOthersVisitedViews(view)
        delOthersCachedViews(view)
        resolve({
          visitedViews: [...state.tagsView.visitedViews],
          cachedViews: [...state.tagsView.cachedViews]
        })
      })
    }

    function delView(view) {
      return new Promise(resolve => {
        delVisitedView(view)
        delCachedView(view)
        resolve({
          visitedViews: [...state.tagsView.visitedViews],
          cachedViews: [...state.tagsView.cachedViews]
        })
      })
    }

    function updateVisitedView(view) {
      for (let v of state.tagsView.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }


    function addCachedView(view) {
      if (state.tagsView.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.tagsView.cachedViews.push(view.name)
      }
    }


    function delVisitedView(view) {
      return new Promise(resolve => {
        for (const [i, v] of state.tagsView.visitedViews.entries()) {
          if (v.path === view.path) {
            state.tagsView.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...state.tagsView.visitedViews])
      })
    }


    function delOthersVisitedViews(view) {
      return new Promise(resolve => {
        state.tagsView.visitedViews = state.tagsView.visitedViews.filter(v => {
          return v.meta.affix || v.path === view.path
        })
        resolve([...state.tagsView.visitedViews])
      })
    }

    function delOthersCachedViews(view) {
      return new Promise(resolve => {
        const index = state.tagsView.cachedViews.indexOf(view.name)
        if (index > -1) {
          state.tagsView.cachedViews = state.tagsView.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          state.tagsView.cachedViews = []
        }
        resolve([...state.tagsView.cachedViews])
      })
    }


    return {
      isAffix,
      needTagsView,
      layoutMode,
      visitedViews,
      isActive,
      tagRef,
      tagsViewRef,
      openMenu,
      handleScroll,
      closeSelectedTag
    }
  }
}
</script>