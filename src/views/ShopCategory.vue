<template>
  <div class="admin" :class="{ adminleft: $store.state.collapsed }">
    <a-button class="btn" @click="handleClick">新增类目</a-button>
    <a-table :columns="columns" :data-source="dataList">
      <a slot="admin">
        <a-button @click="handleClick">编辑</a-button>
        <a-button @click="handleClick">删除</a-button>
      </a>
    </a-table>
  </div>
</template>
<script>
import api from '@/api/index';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'handle',
    key: 'handle',
    scopedSlots: { customRender: 'admin' },
  },
];
export default {
  created() {
    api.getCategoryList().then((res) => {
      this.data = res.data;
    });
  },
  computed: {
    dataList() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  data() {
    return {
      columns,
      data: [],
    };
  },
  methods: {
    handleClick() {
      alert('该页功能和商品列表页类似！！！');
    },
  },
};
</script>

<style scoped lang='less'>
.admin {
    position: relative;
    margin-left: 180px;
    margin-top: 50px;
    transition: all 0.3s;
    &.adminleft {
        margin-left: 80px;
    }
    .btn {
        position: absolute;
        top: -35px;
        right: 160px;
    }
}
</style>
