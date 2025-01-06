<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Navbar from "./components/Navbar.vue";
import { useAppStore } from "@/stores/appStore";
import { onMounted } from "vue";

export default{
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const store = useAppStore();
    onMounted(async () => {
      if (store.userId) {
        try {
          await store.fetchUserData(store.userId);
          console.log("User data loaded successfully.");
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        console.warn("No userId found; ensure user is logged in.");
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
