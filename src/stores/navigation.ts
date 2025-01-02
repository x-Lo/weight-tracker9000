import { defineStore } from 'pinia';
import router from '@/router'; // Import the router instance

export const useNavigationStore = defineStore('navigation', {
  actions: {
    navigateTo(route: string): void {
      router.push(`/${route}`); // Directly use the imported router instance
    },
  },
});
