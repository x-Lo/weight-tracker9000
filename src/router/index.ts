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
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import(/* webpackPrefetch: true */ '@/views/CalculatorView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import(/* webpackPrefetch: true */ '@/views/CalendarView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/saveplan',
      name: 'saveplan',
      component: () => import(/* webpackPrefetch: true */ '@/views/SavePlanView.vue'),
      meta: { requiresAuth: false },
    },
  ],
  scrollBehavior () {
    return { top: 0, left: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe(); // Stop listening
      resolve(user);
    });
  });

  // Redirect unauthenticated users trying to access protected routes
  if (requiresAuth && !currentUser) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }, // Store the intended path in query params
    });
  }

  // Allow navigation to proceed
  next();
});

export default router
