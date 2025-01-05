import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackPrefetch: true */ '@/views/HomeView.vue'),
      children: [
        {
          path: '/', // Default route when HomeView loads
          name: 'homeview',
          components: {
            left: () => import(/* webpackPrefetch: true */ '@/components/Quote.vue'), // Default component for the left section
            right: () => import/* webpackPrefetch: true */ ('@/components/Welcome.vue'), // Default component for the right section
          },
        },
        {
          path: '/login',
          name: 'login',
          components: {
            left: () => import(/* webpackPrefetch: true */ '@/components/Quote.vue'),
            right: () => import(/* webpackPrefetch: true */ '@/components/LogIn.vue'),
          },
          meta: { requiresAuth: false },
        },
        {
          path: '/signup',
          name: 'signup',
          components: {
            left: () => import(/* webpackPrefetch: true */ '@/components/Quote.vue'),
            right: () => import(/* webpackPrefetch: true */ '@/components/SignUp.vue'),
          },
          meta: { requiresAuth: false },
        },
        {
          path: '/calculator',
          name: 'calculator',
          components: {
            left: () => import(/* webpackPrefetch: true */ '@/components/Results.vue'),
            right: () => import(/* webpackPrefetch: true */ '@/components/Calculator.vue'),
          },
          meta: { requiresAuth: false },
        },
        {
          path: '/calendar',
          name: 'calendar',
          components: {
            left: () => import(/* webpackPrefetch: true */ '@/components/Calendar.vue'),
            
          },
          meta: { requiresAuth: false },
        },
        {
          path: '/dailyweight',
          name: 'dailyweight',
          components: {
            left: () => import(/* webpackPrefetch: true */ '@/components/Calendar.vue'),
            right: () => import(/* webpackPrefetch: true */ '@/components/DailyWeight.vue'),
          },
          meta: { requiresAuth: true },
        },

      ],
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackPrefetch: true */ '@/views/AccountView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import(/* webpackPrefetch: true */ '@/views/PersonalPlanView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;
  if (requiresAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router
