import { createRouter, createWebHistory } from 'vue-router';

import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import InfoView from '../views/InfoView.vue';
import HomeView from '../views/HomeView.vue';
import SettingsView from '../views/SettingsView.vue';
import ChatView from '../views/ChatView.vue';
import UserView from '../views/UserView.vue';

import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: '/info',
      name: 'info',
      component: InfoView,
      meta: { auth: true },
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { auth: true },
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { auth: true },
    },
    {
      path: '/:username',
      name: 'user',
      component: UserView,
      meta: { auth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.auth && !authStore.isAuthenticated) {
    next({
      name: 'login',
    });
  } else if (
    authStore.isAuthenticated &&
    (to.name === 'login' || to.name === 'register')
  ) {
    next(from);
  } else {
    next();
  }
});

export default router;
