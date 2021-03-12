import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default {};
const router = new Router();

router.beforeEach((to, from, next) => {
  console.log('global: beforeEach');
  if (to.name !== 'Login' && authStore.user === null) next({ path: '/login' });
  else next(false);
});

// export default (context) => {
//   context.app.router.beforeEach((to, from, next) => {
//     if (to.name !== 'Login' && authStore.user === null) next({ path: '/login' });
//     else next(false);
//   });
// };
