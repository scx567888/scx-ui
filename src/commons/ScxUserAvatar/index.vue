<template>
  <el-dropdown appendToBody trigger="hover">
    <div class="avatar-wrapper">
      <img :alt="nickName" :src="avatar" @error="show_default_image">
      <scx-icon icon="down-outlined"/>
    </div>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click.native="goProfile">
          <scx-icon icon="user" style="margin-right: 5px"/>
          用户中心
        </el-dropdown-item>
        <el-dropdown-item @click.native="goDashboard">
          <scx-icon icon="dashboard" style="margin-right: 5px"/>
          首页
        </el-dropdown-item>
        <el-dropdown-item divided @click.native="logoutHandle">
          <scx-icon icon="poweroff" style="margin-right: 5px" type="outlined"/>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import {state} from "../../store";
import {logout} from "../../utils/permUtil";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import "./index.css"

export default {
  name: "scx-user-avatar",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const avatar = computed(() => state.user.avatar);

    const nickName = computed(() => state.user.nickName);

    const show_default_image = (event) => event.target.src = './assets/img/defaultAvatar.gif';

    const goDashboard = () => router.push('/dashboard');

    const goProfile = () => router.push('/profile/index');

    async function logoutHandle() {
      await logout()
      await router.push(`/login?redirect=${route.fullPath}`)
    }

    return {avatar, nickName, show_default_image, logoutHandle, goDashboard, goProfile}
  }
}
</script>