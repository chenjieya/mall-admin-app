<template>
  <div class="main-app">
    <div class="menu-list" :key="key">
      <menu-nav></menu-nav>
    </div>
    <div>
      <header-info></header-info>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import menuNav from '../components/MenuNav.vue';
import headerInfo from '../components/Header.vue';

export default {
  components: {
    menuNav,
    headerInfo,
  },
  data() {
    return {
      key: +new Date(),
    };
  },
  watch: {
    $route() {
      this.key = +new Date();
    },
  },
};
</script>

<style scoped lang='less'>
@import url("../assets/css/reset.css");
.main-app {
  .menu-list {
    width: 180px;
    position: fixed;
    top: 0;
  }
}
</style>
