<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogIn">
      <h2>SIGN IN</h2>
      <div class="input-group">
        <label for="email">
          <span class="icon">📧</span>
        </label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">
          <span class="icon">🔒</span>
        </label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" class="button">SIGN IN</button>
      <p class="forgot-password">
        <a href="#">Forgot Password?</a>
      </p>
      <p class="signup">
        Don't have an account? 
        <a @click.prevent="handleNavigate('signup')">Create an Account</a>
      </p>
    </form>
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
/* Background */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
  text-align: center;
  flex-direction: column;
}

/* Header */
h2 {
  font-size: 2.5em;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #c94079;
  background: linear-gradient(90deg, #c94079, #ff8c42);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  position: relative;
}

/* Add a decorative underline */
h2::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #c94079, #ff8c42);
  border-radius: 4px;
}

/* Form */
.login-form {
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}

/* Input group */
.input-group {
  position: relative;
}

.input-group label {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font-size: 1.2em;
}

.input-group input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1em;
  color: #f0f0f0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #c94079;
}

/* Button */
.button {
  padding: 0.8rem;
  font-size: 1em;
  font-weight: bold;
  color: #f0f0f0;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

/* Links */
.forgot-password a,
.signup a {
  color: #c94079;
  text-decoration: none;
  transition: color 0.3s ease;
}

.forgot-password a:hover,
.signup a:hover {
  color: #f77ba1;
  cursor: pointer;
}

.forgot-password {
  margin: 0.5rem 0;
}

.signup {
  font-size: 1em;
  margin-top: 1rem;
  color: #f0f0f0;
}
</style>
  