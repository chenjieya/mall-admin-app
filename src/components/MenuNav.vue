<template>
  <div class="menu">
    <a-menu
      style="height:100vh"
      :default-selected-keys="[$route.matched[1].name ? $route.matched[1].name : '']"
      :default-open-keys="[$route.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="route in $store.state.menuRouters">
        <a-sub-menu :key='route.name' v-if="!route.meta.visible">
          <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <template v-for="child in route.children">
          <a-menu-item
            v-if="!child.meta.visible"
            :key="child.name">
          <router-link :to='{name: child.name}'>
          <a-icon :type="child.meta.icon" />
          {{ child.meta.title }}
          </router-link>
        </a-menu-item>
        </template>
      </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
