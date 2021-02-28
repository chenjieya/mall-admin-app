<template>
  <div class="header" :class="{ navleft: $store.state.collapsed }">
    <div class="btn">
      <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="handleCollsped"
      >
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </div>
    <div class="break">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ $route.matched[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">{{ $route.matched[1].meta.title }}</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user">
      <li>
        欢迎{{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li @click="handleRemove">退出</li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    handleCollsped() {
      this.$store.commit('toggleCollapsed');
    },
    handleRemove() {
      this.$store.dispatch('removeUser');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped lang='less'>
.header {
  height: 50px;
  line-height: 50px;
  margin-left: 180px;
  border-bottom: 1px solid #eee;
  padding-left: 20px;
  padding-right: 25px;
  transition: all 0.3s;
  &.navleft {
    margin-left: 80px;
  }
  .btn {
    float: left;
  }
  .break {
    display: inline-block;
    margin-left: 20px;
  }
  .user {
    position: fixed;
    top: 0;
    right: 20px;
    z-index: 9999;
    text-align: center;
    cursor: pointer;
    li {
      padding: 0 20px;
    }
    li:not(:first-of-type) {
      display: none;
      &:hover {
        background-color: #eee;
        color: #999;
        font-weight: 700;
      }
    }
    &:hover {
      li {
        display: block;
      }
    }
  }
}
</style>
