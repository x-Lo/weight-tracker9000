<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "./components/Navbar.vue";

export default{
  name: 'App',
  components: {
    Navbar,
  },
};  
</script>

<style scoped>
#app {
  font-family: 'Roboto', Arial, sans-serif;
}
</style>
