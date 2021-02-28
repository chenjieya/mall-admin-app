import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getCookie, removeCookie } from '../utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getCookie(),
    menuRouters: '',
    loading: false,
  },
  mutations: {
    setUserName(state, user) {
      setCookie(user);
      state.user = user;
    },
    removeUser(state) {
      removeCookie();
      state.user = {
        appkey: '',
        email: '',
        username: '',
        role: '',
      };
    },
    getMenuRouters(state, routers) {
      state.menuRouters = routers;
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    isLoading(state) {
      state.loading = true;
    },
    finishLoading(state) {
      state.loading = false;
    },
  },
  actions: {
    setUserName({ commit }, user) {
      commit('setUserName', user);
    },
    removeUser({ commit }) {
      commit('removeUser');
    },
    getMenuRouters({ commit }, routers) {
      commit('getMenuRouters', routers);
    },
  },
  modules: {
  },
});
