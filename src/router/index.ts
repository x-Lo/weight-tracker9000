import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import { useAppStore } from '@/stores/appStore';


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
            right: () => import(/* webpackPrefetch: true */ '@/components/SavePlan.vue'),
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
    {
      path: '/calc2',
      name: 'calc2',
      component: () => import(/* webpackPrefetch: true */ '@/views/CalculatorView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const store = useAppStore();
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe(); // Stop listening
      resolve(user);
    });
  });

  // Redirect logged-in users going to "/calendar" to "/dailyweight"
  if (to.path === "/calendar" && store.userId) {
    return next("/dailyweight");
  }

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
