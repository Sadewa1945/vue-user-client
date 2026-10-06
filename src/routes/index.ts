// import vue router
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Cookie from "js-cookie";

const getToken = () => Cookie.get("token");

// define routes with proper type
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/home/index.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/login.vue"),
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/dashboard/index.vue'),
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
  },
  {
    path: '/admin/users',
    name: 'admin.users.index',
    component: () => import(/* webpackChunkName: "users" */ '../views/admin/users/index.vue'),
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
  },
  {
    path: '/admin/users/create',
    name: 'admin.users.create',
    component: () => import(/* webpackChunkName: "users" */ '../views/admin/users/create.vue'),
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
  },
  {
    path: '/admin/users/edit/:id',
    name: 'admin.users.edit',
    component: () => import( /* webpackChunkName: "home" */ '../views/admin/users/edit.vue'),
    meta: { requiresAuth: true } // <-- Add meta field
  }
];

// create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = getToken();

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'login' }); 
  }
  else if ((to.name === 'login' || to.name === 'register') && token) {
    next({ name: 'dashboard' });
  }
  else {
    next();
  }
});

export default router;
