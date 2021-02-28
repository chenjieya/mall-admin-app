<template>
  <div class="edit" :class="{ 'edit-left': $store.state.collapsed }">
    <a-steps :current="current" class="edit-step">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <add-info v-if="current === 0" @next='next' :form='form'
      ></add-info>
      <add-info-base v-else @prev='prev' :form='form'></add-info-base>
    </div>
  </div>
</template>
<script>
import api from '@/api/index';
import addInfo from '@/components/AddInfo.vue';
import addInfoBase from '@/components/AddInfoBase.vue';

export default {
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: undefined,
        c_items: undefined,
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        status: 1,
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  created() {
    const editId = this.$route.params.id;
    if (editId) {
      api.getLookProduct(editId).then((res) => {
        this.form = res;
      });
    }
  },
  components: {
    addInfo,
    addInfoBase,
  },
  methods: {
    next(form) {
      this.current += 1;
      this.form = {
        ...this.form,
        ...form,
      };
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style scoped lang='less'>
.edit {
   margin-left: 180px;
   transition: all, 0.3s;
   &.edit-left {
       margin-left: 80px;
   }
  .edit-step {
      width: 50%;
      margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>
