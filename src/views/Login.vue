<template>
  <div class="login">
    <a-form-model
      class="login-from"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="ruleForm.email" type="text" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="handleRegister">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import api from '../api/index';

export default {
  data() {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入邮箱'));
      }
      const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailReg.test(value)) {
        callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: '',
        pass: '',
      },
      rules: {
        email: [{ validator: validateUser, trigger: 'change' }],
        pass: [{ validator: validatePass2, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.loginPost({ email: this.ruleForm.email, password: this.ruleForm.pass }).then(
            (res) => {
              NProgress.start();
              this.$store.dispatch('setUserName', res);
              this.$router.push({ name: 'Home' });
              NProgress.done();
            },
            (error) => {
              this.$message.error(error);
            },
          );
          return true;
        }
        console.log('error sumbit');
        return false;
      });
    },
    handleRegister() {
      NProgress.start();
      this.$router.push({ name: 'register' });
      NProgress.done();
    },
  },
};
</script>

<style scoped lang='less'>
.login {
  height: 100vh;
  padding-top: 100px;
  .login-from {
    max-width: 500px;
    border: 1px solid #eee;
    margin: 0 auto;
    padding: 30px 20px 6px;
  }
}
</style>
