import { defineStore } from 'pinia';
import api from '../utils/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  actions: {
    forgetUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    async login() {
      const user = await api.post("/login");
      if (user.error) {
        return user;
      }
      this.setUser(user);
    },
    async logout() { 
      await api.post("/logout");
      this.forgetUser(); 
    },
  },
});
