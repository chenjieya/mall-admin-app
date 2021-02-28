<template>
  <div class="table" :class="{ tableleft: $store.state.collapsed }">
    <a-table
      :columns="columns"
      :data-source="tableShop"
      :pagination="pagination"
      :loading='$store.state.loading'
      @change="changePage"
    >
      <div slot="handle" slot-scope="text, record">
        <a-button @click="editShop(record)">编辑</a-button>
        <a-button @click="removeShop(record)">删除</a-button>
      </div>
    </a-table>
  </div>
</template>
<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'handle',
    key: 'handle',
    ellipsis: true,
    width: 200,
    scopedSlots: { customRender: 'handle' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['shop', 'pagination'],
  computed: {
    tableShop() {
      const arr = this.shop.map((item) => ({
        ...item,
        key: item.id,
      }));
      return arr;
    },
  },
  methods: {
    changePage(val) {
      /* val是点击分页之后的信息 */
      this.$emit('change', val);
    },
    editShop(record) {
      this.$router.push({
        name: 'edit',
        params: {
          id: record.id,
        },
      });
    },
    removeShop(record) {
      this.$emit('deleteShop', record);
    },
  },
};
</script>
<style scoped lang='less'>
.table {
  margin-left: 180px;
  transition: all 0.3s;
  &.tableleft {
    margin-left: 80px;
  }
}
</style>
