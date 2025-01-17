<template>
  <div id="app">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component  :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  import Navbar from "./components/Navbar.vue";
  import { useAppStore } from "@/stores/appStore";
  import { onMounted } from "vue";

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
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Roboto', Arial, sans-serif;
  height: 100vh;
}

/* route transitions  */
.route-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.route-enter-active {
  transition: all 0.7s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.route-leave-active {
  transition: all 0.7s ease-in;
}

</style>
