/* 不同的用户显示不同的路由 */
const userRouter = {
  coustomer: [
    {
      path: '/product/list',
      name: 'list',
      meta: {
        title: '商品列表',
        visible: false,
        icon: 'unordered-list',
      },
      component: () => import('../views/ShopList.vue'),
    }, {
      path: '/product/add',
      name: 'add',
      meta: {
        title: '添加商品',
        visible: false,
        icon: 'file-add',
      },
      component: () => import('../views/ShopAdd.vue'),
    }, {
      path: '/product/edit/:id',
      name: 'edit',
      meta: {
        title: '编辑商品',
        visible: true,
        icon: 'file-add',
      },
      component: () => import('../views/ShopAdd.vue'),
    },
  ],
  admin: [
    {
      path: '/product/list',
      name: 'list',
      meta: {
        title: '商品列表',
        visible: false,
        icon: 'unordered-list',
      },
      component: () => import('../views/ShopList.vue'),
    }, {
      path: '/product/add',
      name: 'add',
      meta: {
        title: '添加商品',
        visible: false,
        icon: 'file-add',
      },
      component: () => import('../views/ShopAdd.vue'),
    }, {
      path: '/product/category',
      name: 'category',
      meta: {
        title: '商品类目管理',
        visible: false,
        icon: 'minus-square',
      },
      component: () => import('../views/ShopCategory.vue'),
    }, {
      path: '/product/edit/:id',
      name: 'edit',
      meta: {
        title: '编辑商品',
        visible: true,
        icon: 'file-add',
      },
      component: () => import('../views/ShopAdd.vue'),
    },
  ],
};

export default function (role) {
  if (role === 'admin') {
    return userRouter.admin;
  }
  return userRouter.coustomer;
}
