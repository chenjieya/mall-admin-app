<template>
  <div class="search" :class="{ searchleft: $store.state.collapsed }">
      <a-form-model
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="检索关键字：">
      <a-input
        v-model="searchForm.searchWord"
        placeholder="请输入关键字"
      ></a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <a-select
        show-search
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleChange"
        allowClear
      >
        <a-select-option
        v-for="item in categoryList"
        :key="item.id"
        :value="item.id"> {{ item.name }} </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit">搜索</a-button>
    </a-form-model-item>
  </a-form-model>
    <a-button class="add-btn">
        <router-link :to="{ name: 'add'}">添加商品</router-link>
    </a-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: 0,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submitSearch', this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
  props: ['categoryList'],
};
</script>

<style scoped lang='less'>
.search {
    position: relative;
    padding: 20px 0;
    margin-left: 210px;
    transition: all 0.3s;
    &.searchleft {
        margin-left: 130px;
    }
    .add-btn {
        position: absolute;
        top: 24px;
        right: 10px;
        z-index: 1000;
    }
}
</style>
