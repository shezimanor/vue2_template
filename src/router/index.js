import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/random-user',
    name: 'RandomUser',
    component: () => import(/* webpackChunkName: "random-user" */ '../views/RandomUser.vue')
  }
];

const router = new VueRouter({
  routes
});

// router navigationguard
router.beforeEach((to, from, next) => {
  // console.log('router: beforeEach');
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ['/sign-in', '/sign-up', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  let userData = null;
  if (loggedIn) {
    userData = JSON.parse(loggedIn);
    store.commit('user/SET_USER_DATA', userData);
  }
  if (authRequired && !userData.user) return next('/');
  next();
});

export default router;
