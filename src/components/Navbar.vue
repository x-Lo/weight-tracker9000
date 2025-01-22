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
@media (max-width: 600px) {
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
@media (min-width: 600px) {
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
@media screen and (min-width: 768px) {
  
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  
}
</style>