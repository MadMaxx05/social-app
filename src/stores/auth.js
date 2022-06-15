import { defineStore } from 'pinia';
import { Api } from '@/utils/api';
import router from '@/router/index';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!Cookies.get('token'),
  }),
  actions: {
    async register({ username, password }) {
      await Api().post('auth/registration', {
        username,
        password,
      });

      const response = (await this.login({ username, password })).data;
      await this.setToken(response.token);
    },

    async login({ username, password }) {
      return await Api().post('auth/login', {
        username,
        password,
      });
    },

    setToken(token) {
      Cookies.set('token', token);
      this.isAuthenticated = !!Cookies.get('token');
    },

    async logout() {
      Cookies.remove('token');
      this.isAuthenticated = !!Cookies.get('token');
      router.push({ name: 'login' });
    },
  },
});
