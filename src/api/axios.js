import axios from 'axios';
import store from '@/store/index';

// 配置axios
axios.defaults.baseURL = 'https://mallapi.duyiedu.com/';
const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  if (!config.url.includes('passport')) {
    return {
      ...config,
      params: {
        ...config.params,
        appkey: store.state.user.appkey,
      },
    };
  }
  return config;
});

instance.interceptors.response.use((response) => {
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
});

export default instance;
