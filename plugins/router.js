import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router();

router.beforeEach((to, from, next) => {
  console.log('global: beforeEach');
  if (to.name !== 'Login' && authStore.user === null) next({ path: '/login' });
  else next(false);
});
