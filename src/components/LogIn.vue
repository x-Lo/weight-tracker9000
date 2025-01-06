<template>
  <h1>Login Here</h1>
  <div class="card">
    <form @submit.prevent="handleLogIn">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
        <div class="signup">
          <p>
            Don't have an account? 
            <a @click.prevent="handleNavigate('signup')">Create Account</a>
          </p>
        </div>
      </div>
      <button class="button" type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>    
</template>
  
<script lang="ts" defer>
  import { defineComponent, ref } from "vue";
  import { logIn } from "@/services/authService";
  import { getUserProfile } from "@/services/userService";
  import { useRouter, useRoute } from "vue-router";
  import { useNavigation } from "@/composables/useNavigation";
  import { useAppStore } from "@/stores/appStore";
  
  export default defineComponent({
    setup() {
      const email = ref("");
      const password = ref("");
      const errorMessage = ref("");
      const router = useRouter(); // Access the router instance
      const route = useRoute();
      const { navigate } = useNavigation();
      const store = useAppStore();

      const handleNavigate = (route: string) => {
        navigate(route);
      };
  
      const handleLogIn = async () => {
        try {
          errorMessage.value = ""; // Reset error message
          const user = await logIn(email.value, password.value);
  
          // Fetch user profile after logging in
          const userProfile = await getUserProfile(user.uid);
          store.setCalendarAttributes([]);
          store.fetchUserData(user.uid);
          console.log("User logged in successfully!", userProfile);
          const redirectPath = route.query.redirect || "/"; // Default to home if no redirect
          router.push(redirectPath as string);
        } catch (error) {
          console.error("Error logging in:", error);
        }
      };

  
      return { email, password, errorMessage, handleLogIn, handleNavigate };
    },
  });
</script>
  
<style scoped>
h1 {
  padding: 1rem;
  font-size: 2rem;
}

.card {
  max-width: 400px; /* Ensures the card has a consistent width */
  width: 100%;
  padding: 1rem; /* Reduced padding */
  font-size: 1rem; /* Slightly smaller font size */
  align-items: center;
}


.form-group {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
}

.signup {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  color: #f0f0f0;
}
  
.signup a {
  cursor: pointer;
  color: #C94079;
  text-decoration: underline;
}

.signup p {
  font-size: 1rem;
  text-align: center;
}

.button {
  width: 100%;
  padding: 0.5rem; /* Reduced padding */
  font-size: 1rem; /* Reduced font size */
}
</style>
  