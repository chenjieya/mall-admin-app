<template>
  <div class="edit-info">
    <a-form-model
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rule="rule"
      ref="form"
    >
      <a-form-model-item label="标题" required prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          @change="handleItem"
        >
          <a-select-option
            :value="item.id"
            v-for="item in categoryList"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请添加子类目">
          <a-select-option v-for="c in sitemsList" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" required prop="tags">
        <a-select
          placeholder="请填写商品标签"
          mode="tags"
          v-model="form.tags"
          :token-separators="['包邮，最晚次日达']"
        >
          <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-item label='' :wrapper-col="{ span: 22 }">
        <a-button
          type="primary"
          @click="next('form')"
        >
          下一步
        </a-button>
      </a-form-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/index';

export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      rule: {},
      categoryList: [],
      sitemsList: [],
    };
  },
  props: ['form'],
  created() {
    api.getCategoryList().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    handleItem(v) {
      this.categoryList.forEach((item) => {
        if (item.id === v) {
          this.sitemsList = item.c_items;
        }
      });
    },
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
        return true;
      });
    },
    prev() {
      this.$emit('jian', this.current += 1);
    },
  },
};
</script>
