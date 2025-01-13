<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSignUp">
      <h2>SIGN UP</h2>
      <div class="input-group">
        <label for="username">
          <span class="icon">👤</span>
        </label>
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>
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
      <button type="submit" class="login-button">SIGN UP</button>
      <p class="signup">
        Already have an account?
        <a @click.prevent="handleNavigate('login')">Sign In</a>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
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
        errorMessage.value = "Error creating account. Please try again.";
      }
    };

    return { email, password, username, errorMessage, handleSignUp, handleNavigate };
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
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #c94079;
}

/* Button */
.login-button {
  padding: 0.8rem;
  font-size: 1em;
  font-weight: bold;
  color: #f0f0f0;
  background: linear-gradient(to right, #c94079, #ff8c42);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  transform: translateY(-3px);
}

/* Links */
.signup a {
  color: #c94079;
  text-decoration: none;
  transition: color 0.3s ease;
}

.signup a:hover {
  color: #f77ba1;
  cursor: pointer;
}

.signup {
  font-size: 1em;
  margin-top: 1rem;
  color: #bdbdbd;
}

/* Error Message */
.error-message {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
