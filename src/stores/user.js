import { defineStore } from 'pinia';
import { Api } from '@/utils/api';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: null,
    user: null,
    info: false,
  }),
  actions: {
    async fetchUsers() {
      return await Api().get('main/users');
    },
    async fetchUser() {
      return await Api().get('main/user');
    },
    async fetchUserByUsername(username) {
      return await Api().get(`main/user/${username}`);
    },
    async findUsers(search) {
      return await Api().post('main/search', {
        search,
      });
    },
    async changeFullName(fullName) {
      return await Api().post('profile/fullName', {
        fullName,
      });
    },
    async changeCountry(country) {
      return await Api().post('profile/country', {
        country,
      });
    },
    async changeCity(city) {
      return await Api().post('profile/city', {
        city,
      });
    },
    async changeDescription(description) {
      return await Api().post('profile/description', {
        description,
      });
    },
    async changeInterests(interests) {
      return await Api().post('profile/interests', {
        interests,
      });
    },
    async changeContact(contact) {
      return await Api().post('profile/contact', {
        contact,
      });
    },
  },
});
