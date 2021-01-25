<template>
  <div class="sidebar-logo-container scx-logo">
    <router-link key="expand" class="sidebar-logo-link" to="/">
      <scx-icon class="sidebar-logo" icon="scx-logo"/>
      <h1 class="sidebar-title">{{ title }} </h1>
    </router-link>
  </div>
</template>

<script>
import scxConfig from "../../../scx.config";
import "./index.css";

export default {
  name: "ScxLogo",
  setup() {
    const title = scxConfig.title;
    return {title}
  }
}
</script>