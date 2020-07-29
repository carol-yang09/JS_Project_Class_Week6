import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  // 前台
  {
    path: '/',
    // name: 'Layout',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/front/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/About.vue'),
      },
      {
        path: 'productslist',
        name: 'productsList',
        component: () => import('../views/front/ProductsList.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/front/Cart.vue'),
      },
      {
        path: 'createorder',
        name: 'CreateOrder',
        component: () => import('../views/front/CreateOrder.vue'),
      },
    ],
  },
  // 登入頁面
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // 後台
  {
    path: '/admin',
    // name: 'Dashboard',
    component: () => import('../views/DashboardLayout.vue'),
    children: [
      {
        path: '/admin',
        name: 'Dashboard',
        component: () => import('../views/admin/Dashboard.vue'),
      },
      {
        path: 'couponsmanage',
        name: 'CouponsManage',
        component: () => import('../views/admin/CouponsManage.vue'),
      },
      {
        path: 'ordersmanage',
        name: 'OrdersManage',
        component: () => import('../views/admin/OrdersManage.vue'),
      },
      {
        path: 'productsmanage',
        name: 'ProductsManage',
        component: () => import('../views/admin/ProductsManage.vue'),
      },
      {
        path: 'picturesmanage',
        name: 'PicturesManage',
        component: () => import('../views/admin/PicturesManage.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
});

export default router;
