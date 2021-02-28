<template>
  <div class="shop-list">
    <div class="shop-search">
      <shop-search
        @submitSearch="filterSearchInfo"
        :categoryList="categoryList"
      ></shop-search>
    </div>
    <div class="shop">
      <shop
        :shop="shop"
        :pagination="page"
        @change="changePage"
        @deleteShop="deleteshop"
      />
    </div>
  </div>
</template>
<script>
import shopSearch from '@/components/ShopSearch.vue';
import shop from '@/components/Shop.vue';
import api from '@/api/index';

export default {
  data() {
    return {
      shop: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 100,
      },
      filterParams: {},
      categoryList: [],
      dataObj: {},
    };
  },
  async created() {
    this.$store.commit('isLoading');
    await api.getCategoryList().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.dataObj[item.id] = item;
      });
    });
    api.getProducts().then((r) => {
      this.$store.commit('finishLoading');
      this.shop = this.handleShopData(r.data);
    });
  },
  components: {
    shopSearch,
    shop,
  },
  methods: {
    filterSearchInfo(params) {
      this.filterParams = params; /* 检索的参数存储一下，为了后面翻页的时候获取数据的后半部分 */
      const { category, searchWord } = params;
      api
        .getProducts({
          page: this.page.current,
          size: this.page.pageSize,
          category,
          searchWord,
        })
        .then((res) => {
          this.page.total = res.total;
          this.shop = this.handleShopData(res.data);
        });
    },
    changePage(page) {
      this.page = page;
      this.filterSearchInfo(this.filterParams);
    },
    deleteshop(record) {
      const self = this;
      this.$confirm({
        title: `确定想要删除${record.title}数据吗？`,
        content: '点击确定即可删除数据，取消则返回。',
        onOk() {
          api
            .deleteProduct(record.id, { appkey: self.$store.state.user.appkey })
            .then(() => {
              /* 需要从新获取数据 */
              api.getProducts().then((res) => {
                self.shop = self.handleShopData(res.data);
              });
            });
        },
        onCancel() {},
      });
    },
    handleShopData(data) {
      return data.map((item) => ({
        ...item,
        categoryName: this.dataObj[item.category].name,
      }));
    },
  },
};
</script>
