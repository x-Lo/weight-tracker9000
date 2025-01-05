<template>
  <h1>Create Account</h1>
  <div class="card">
    <form @submit.prevent="handleSignUp">
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
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="Enter your username"
          required
        />
        <div class="login">
          <p>
            Already have an account? 
            <a @click.prevent="handleNavigate('login')">Login Here</a>
          </p>
        </div>
      </div>
      <button class="button" type="submit">Create Account</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
  
<script lang="ts" defer>
  import { defineComponent, ref } from "vue";
  import { signUp } from "@/services/authService";
  import { createUserProfile } from "@/services/userService";
  import { useRouter } from "vue-router";
  import { useNavigation } from "@/composables/useNavigation";
  import { useAppStore } from "@/stores/appStore";
  
  export default defineComponent({    
    setup() {
      const email = ref("");
      const password = ref("");
      const username = ref("");
      const errorMessage = ref("");
      const router = useRouter(); // Access the router instance
      const { navigate } = useNavigation();
      const store = useAppStore();

      const handleNavigate = (route: string) => {
        navigate(route);
      };
  
      const handleSignUp = async () => {
        try {
          errorMessage.value = ""; // Reset error message
          const user = await signUp(email.value, password.value);
          await createUserProfile(user.uid, { username: username.value });
          store.updateUser(user.uid, username.value);
          await store.saveUserData();
          console.log("Account created successfully!");
          router.push("/account"); // Navigate to AccountView
        } catch (error) {
          console.error("Error signing up:", error);
        }
      };
  
      return { email, password, username, errorMessage, handleSignUp, handleNavigate };
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
}
 
.login {
  margin-top: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: #f0f0f0;
}
  
.login a {
  cursor: pointer;
  color: #C94079;
  text-decoration: underline;
}

.login p {
  font-size: 1rem;
  text-align: center;
}

.button {
  width: 100%;
  padding: 0.5rem; /* Reduced padding */
  font-size: 1rem; /* Reduced font size */
}
</style>
  