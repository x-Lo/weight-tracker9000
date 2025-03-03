<template>
    <nav class="navbar">
        <div class="logo-div">
            <h3 class="logo">Weight Tracker 9000</h3>
        </div>
        <div class="hamburger" @click="toggleMenu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div :class="['nav-links', { 'nav-active': menuOpen }]">
          <router-link 
            to="/" 
            class="nav-link" 
            :class="{ active: activeLink === '/' }"
            @click="setActiveLink('/')"
          >Home</router-link>
          <router-link 
              to="/calendar" 
              class="nav-link" 
              :class="{ active: activeLink === '/calendar' }"
              @click="setActiveLink('/calendar')"
          >Calendar</router-link>
          <router-link 
            to="/account" 
            class="nav-link" 
            :class="{ active: activeLink === '/account' }"
            @click="setActiveLink('/account')"
          >Account</router-link>
          <!-- Permanent Login/Logout button -->
          <div>
            <button 
            class="button" 
            @click="isLoggedIn ? logout() : login()"
          >
            {{ isLoggedIn ? "Sign Out" : "Sign In" }}
          </button>
          </div>
        </div>
    </nav>
  </template>
  
<script lang="ts" setup>
  import { ref, watch, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useAppStore } from "@/stores/appStore";
  
  // Reactive references
  const menuOpen = ref(false);
  const activeLink = ref("/"); // Store the active link path
  const isLoggedIn = ref(false); // Track if the user is logged in
  
  // Router and route instances
  const router = useRouter();
  const route = useRoute();
  
  // Set the active link based on the current route
  activeLink.value = route.path;
  
  // Check authentication state
  const auth = getAuth();
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = !!user; // Update isLoggedIn based on user presence
    });
  });
  
  // Watch for route changes and update `activeLink`
  watch(
    () => route.path,
    (newPath) => {
      activeLink.value = newPath;
    }
  );
  
  // Methods
  function toggleMenu() {
    menuOpen.value = !menuOpen.value;
  }
  
  function setActiveLink(path: string) {
    activeLink.value = path;
    menuOpen.value = false; // Close menu after selecting a link
  }
  
  async function logout() {
    try {
      await signOut(auth);
      const store = useAppStore();
      store.logout();
      router.push("/"); // Redirect to the home page after logout
      menuOpen.value = false; // Close menu after logging out
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  
  function login() {
    router.push("/login"); // Redirect to the SignInView.vue
    menuOpen.value = false; // Close menu after selecting a link
  }
</script>  
  
<style scoped>
.navbar {
  position: sticky;
  height: 10%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #191919;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 500; /* Ensure nav stays above other content */
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 600; /* Higher than nav for safety */
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
}

/* Active link styling */
.nav-link.active {
  color: #C94079;
  font-size: 1.5rem;
}

.hamburger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  z-index: 700; /* Highest z-index for menu */
}

.hamburger .bar {
  width: 30px;
  height: 3px;
  background-color: #C94079;
}

.logo {
  font-family: "Righteous", sans-serif;
  background-color: #f3ec78;
  font-size: 2rem;
  background-image: linear-gradient(90deg, #C94079, #FF8C42);
  background-clip: text;
  background-size: 100%
  background-repeat;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 3rem;
    right: 1rem;
    background-color: #191919;
    border-radius: 20px;
    padding: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-active {
    display: flex;
    font-size: 1.5rem;
  }

  .nav-link {
    padding: 0.5rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .nav-link:hover {
    color: #fff;
    border-radius: 5px;
  }

  .nav-link.active {
    font-size: 1.5rem;
  }

  .hamburger {
    display: flex;
  }

  .auth-button {
    margin-top: 10px;
  }

  .logo {
    font-size: 2em;
  }

  .navbar {
    height: 7%;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 767px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 2rem;
    right: 0.5rem;
    background-color: #191919;
    border-radius: 20px;
    padding: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-active {
    display: flex;
  }

  .nav-link {
    padding: 0.5rem;
    text-align: center;
    font-size: 1.3rem;
  }

  .nav-link:hover {
    color: #fff;
    border-radius: 5px;
  }

  .nav-link.active {
    font-size: 1.3rem;
  }

  .hamburger {
    display: flex;
  }

  .auth-button {
    margin-top: 10px;
  }

  .logo {
    font-size: 2em;
  }
 
  .navbar {
    height: 10%;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1279px) {
  
}
</style>