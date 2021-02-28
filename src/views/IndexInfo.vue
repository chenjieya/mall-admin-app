<template>
  <div class="info" :class="{ cardleft: $store.state.collapsed }">
    <div style="background-color: #ececec; padding: 20px">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="商品总览" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="用户总览" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="销售总览" :bordered="false">
            <p>card content</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <line-chart />
  </div>
</template>
<script>
import lineChart from '@/components/LineChart.vue';

export default {
  components: {
    lineChart,
  },
};
</script>
<style scoped lang='less'>
.info {
    margin-left: 180px;
    transition: all .3s;
    &.cardleft {
        margin-left: 80px;
    }
}
</style>
