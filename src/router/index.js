import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Agreement from '../views/Agreement.vue';
import IndexInfo from '../views/IndexInfo.vue';
import filterRouter from '../utils/filterRouter';

Vue.use(VueRouter);
const asyncRouter = [
  {
    path: '/product',
    name: 'product',
    redirect: { name: 'index' },
    meta: {
      title: '商品',
      visible: false,
      icon: 'inbox',
    },
    component: Home,
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'index' },
    meta: {
      title: '首页',
      visible: false,
      icon: 'bank',
    },
    component: Home,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '统计',
          visible: false,
          icon: 'line-chart',
        },
        component: IndexInfo,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      visible: true,
    },
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      visible: true,
    },
    component: Register,
  },
  {
    path: '/agreement',
    name: 'agreement',
    meta: {
      visible: true,
    },
    component: Agreement,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
/* 处理没登录就进入首页 */
let flage = true;
router.beforeEach((to, from, next) => {
  if (to.name === 'agreement' || to.name === 'register') {
    return next();
  }
  if (to.name !== 'login') {
    if (store.state.user.username && store.state.user.appkey && store.state.user.email) {
      if (flage) {
        flage = false;
        const userRouter = filterRouter(store.state.user.role);
        asyncRouter[0] = {
          ...asyncRouter[0],
          children: [
            ...userRouter,
          ],
        };
        store.dispatch('getMenuRouters', routes.concat(asyncRouter)).then(() => {
          router.addRoutes(asyncRouter);
          next();
        });
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
