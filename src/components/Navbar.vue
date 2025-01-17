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
  
<script lang="ts">
import { useAppStore } from "@/stores/appStore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

  export default {
    name: "Navbar",

    data() {
      return {
        menuOpen: false,
        activeLink: "/", // Store the active link path
        isLoggedIn: false, // Track if the user is logged in
      };
    },

    created() {
      // Set the active link based on the current route when the component is created
      this.activeLink = this.$route.path;

      // Check authentication state
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        this.isLoggedIn = !!user; // Update isLoggedIn based on user presence
      });
    },

    watch: {
      // Watch for route changes and update activeLink accordingly
      $route(to) {
        this.activeLink = to.path;
      },
    },

    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      setActiveLink(path: string) {
        this.activeLink = path;
        this.menuOpen = false; // Close menu after selecting a link
      },
      async logout() {
        const auth = getAuth();
        try {
          await signOut(auth);
          const store = useAppStore();
          store.logout();
          this.$router.push("/"); // Redirect to the home page after logout
          this.menuOpen = false; // Close menu after selecting a link
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      login() {
        this.$router.push("/login"); // Redirect to the SignInView.vue
        this.menuOpen = false; // Close menu after selecting a link
      },
    },
  };
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
  font-family: Arial, Helvetica, sans-serif;
}

/* Active link styling */
.nav-link.active {
  color: #C94079;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
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


/* Mobile styles */
@media screen and (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #191919;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .nav-active {
    display: flex;
  }

  .nav-link {
    padding: 10px;
    text-align: center;
    font-size: 18px;
  }

  .nav-link:hover {
    color: #fff;
    border-radius: 5px;
  }

  .hamburger {
    display: flex;
  }

  .auth-button {
    margin-top: 10px;
  }
}
</style>