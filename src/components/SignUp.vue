<template>
  <div class="login-container" ref="signup">
    <form class="login-form" @submit.prevent="handleSignUp">
      <h2>Create an Account</h2>
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
      <button type="submit" class="button">SIGN UP</button>
      <p class="signup">
        Already have an account?
        <a @click.prevent="navigate('login')">Sign In</a>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { signUp } from "@/services/authService";
  import { ref, onMounted } from "vue";
  import { createUserProfile } from "@/services/userService";
  import { useRouter } from "vue-router";
  import { useNavigation } from "@/composables/useNavigation";
  import { useAppStore } from "@/stores/appStore";
  import gsap from "gsap";
  const email = ref("");
  const password = ref("");
  const username = ref("");
  const errorMessage = ref("");
  const router = useRouter(); // Access the router instance
  const { navigate } = useNavigation();
  const store = useAppStore();
  const signup = ref<HTMLElement | null>(null);

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

  onMounted(async() => {
    // animation code
    if (signup.value) {
      gsap.fromTo(
        signup.value.querySelectorAll("*"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 0.7, 
          ease: "power1.out" 
        }
      );
    }
  });
</script>

<style scoped>
/* Background */
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
  text-align: center;
  flex-direction: column;
}

/* Header */
h2 {
  font-size: 2em;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #f0f0f0;
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
  height: 2px;
  background: #c94079;
  border-radius: 2px;
}


/* Form */
.login-form {
  width: 100%;
  min-width: 40vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(39, 39, 39, 0.1);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
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
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
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
  color: #f0f0f0;
}

/* Error Message */
.error-message {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media (min-width: 600px) and (max-width: 767px) {
  .login-container {
    padding: 0.5rem;
  }

  h2 {
    font-size: 1.2em;
    margin-bottom: 0.5rem;
  }

  h2::after {
    height: 1px;
  }

  h4 {
    font-size: 0.9em;
    margin-bottom: 0.5rem;
  }

  .login-form {
    min-width: 25vh;
    gap: 0.5rem;
    padding: 0.8rem;
    border-radius: 15px;
  }

  .input-group label {
    font-size: 0.9em;
  }

  .input-group input {
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    font-size: 0.8em;
  }

  .button {
    padding: 0.5rem;
    font-size: 0.8em;
    border-radius: 8px;
  }

  .signup {
    font-size: 0.8em;
    margin: 0.3rem 0;
  }

  .signup a {
    font-size: 0.8em;
  }
}
</style>
