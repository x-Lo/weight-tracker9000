<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue";
import { useAppStore } from "@/stores/appStore";
import { defineComponent, onMounted } from "vue";

export default{
  name: 'App',
  components: {
    Navbar,
  },

  setup() {
    const store = useAppStore();

    onMounted(async () => {
      if (store.userId) {
        // Fetch the user data if logged in
        try {
          await store.fetchUserData(store.userId);
          console.log("User data loaded successfully.");
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    });

  return {};
  },
};
</script>

<style scoped>
#app {
  font-family: 'Roboto', Arial, sans-serif;
}
</style>
