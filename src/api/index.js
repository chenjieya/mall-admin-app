import axios from 'axios';
import instance from './axios';
import urls from './urls';

// 所有的网络请求函数
export default {
  loginPost(params) {
    return instance.post(urls.login, params);
  },
  registerPost(params) {
    return instance.post(urls.register, params);
  },
  captchaPost(params) {
    return instance.post(urls.captcha, params);
  },
  getCategoryList(params) {
    return instance.get(urls.categoryList, { params });
  },
  getProducts(params) {
    return instance.get(urls.products, { params });
  },
  deleteProduct(id, params) {
    return axios.delete(`${urls.delete}/${id}`, { params });
  },
  postAddProduct(params) {
    return instance.post(urls.addProduct, params);
  },
  getLookProduct(id) {
    return instance.get(`${urls.lookProduct}/${id}`);
  },
  putEditProduct(params) {
    return instance.put(urls.editProduct, params);
  },
};
