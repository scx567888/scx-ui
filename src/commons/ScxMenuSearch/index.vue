<template>
  <div :class="{show}" class="header-search">
    <el-tooltip :content="t('navbar.headerSearch')" effect="dark" placement="bottom">
      <div @click="click">
        <scx-icon class="search-icon" icon="search"/>
      </div>
    </el-tooltip>
    <el-select
        ref="headerSearchSelectRef"
        v-model="search"
        :placeholder="t('navbar.search')"
        :remote-method="querySearch"
        class="header-search-select"
        default-first-option
        filterable
        remote
        @change="change">
      <el-option v-for="item in options" :key="item.path" :label="item.title.join(' > ')" :value="item"/>
    </el-select>
  </div>
</template>

<script>
import {state} from "../../store";
import {t} from "../../i18n";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {resolvePath} from "../../utils";
import "./index.css";

export default {
  name: 'scx-menu-search',
  setup() {

    const router = useRouter();
    const search = ref('');
    const options = ref([]);
    const searchPool = ref([]);
    const show = ref(true);
    const headerSearchSelectRef = ref(null);


    const routes = computed(() => state.permission.routes);
    const lang = computed(() => state.setting.language);


    function click() {
      show.value = !show.value;
      console.log(show.value)
      if (show.value) {
        console.log(headerSearchSelectRef)
        headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
      }
    }

    function close() {
      headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
      options.value = [];
      show.value = false
    }

    function change(val) {
      router.push(val.path);
      search.value = '';
      options.value = [];
      nextTick(() => {
        show.value = false
      })
    }

    //筛选出可以在侧栏中显示的路由
    //并生成国际化的标题
    function generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = [];

      for (const r of routes) {
        // skip hidden router
        if (r.hidden) {
          continue
        }

        const data = {
          path: resolvePath(basePath, r.path),
          title: [...prefixTitle]
        }

        if (r.name) {
          // generate internationalized title
          const i18nTitle = t('route.' + r.name);

          data.title = [...data.title, i18nTitle];

          if (r.redirect !== 'noRedirect') {
            //只推有标题的路线
            //特殊情况：需要排除没有重定向的父路由器
            res.push(data)
          }
        }

        //递归子路由
        if (r.children) {
          const tempRoutes = generateRoutes(r.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    }

    function querySearch(query) {
      if (query !== '') {
        options.value = searchPool.value.filter(item => item.title.join('').indexOf(query) !== -1);
      } else {
        options.value = []
      }
    }


    watch(lang, () => {
      searchPool.value = generateRoutes(routes.value)
    })
    watch(routes, () => {
      searchPool.value = generateRoutes(routes.value)
    })
    watch(show, (value) => {
      if (value) {
        // document.body.addEventListener('click', close)
      } else {
        document.body.removeEventListener('click', close)
      }
    })


    onMounted(() => {
      searchPool.value = generateRoutes(routes.value)
    })

    return {t, click, headerSearchSelectRef, generateRoutes, querySearch, change, search, show, options}
  }
}
</script>