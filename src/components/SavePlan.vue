<template>
    <div class="saveplan-container" ref="savePlan" v-show="!isUserLoggedIn">
      <h1>Ready to realize your full potential?</h1>
      <h2>Sign up to save your personalized plan and track your progress with daily weight logs.</h2>
      <button class="button" @click="navigate('signup')">Create Your Account!</button>
    </div>
    <div class="saveplan-container" ref="savePlan" v-show="isUserLoggedIn">
      <h1>Ready to realize your full potential?</h1>
      <h2>Save your new plan and get on track!.</h2>
      <button class="button" @click="savePlanAction()">Save Your Plan!</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { useNavigation } from '@/composables/useNavigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import gsap from 'gsap';

const { navigate } = useNavigation();
const store = useAppStore();
const savePlan = ref<HTMLElement | null>(null);

// Computed property to check if the user is logged in
const isUserLoggedIn = computed(() => !!store.userId);

const checkAuthState = async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user && user.uid) {
      store.userId = user.uid; // Set the userId in Pinia store
    } else {
      store.userId = null; // Reset if no user is authenticated
    }
  });
};

const savePlanAction = () => {
  store.saveUserData();
  console.log('Save plan clicked!');
  navigate('calendar');
};

onMounted(async () => {
  await checkAuthState(); // Ensure the auth state is checked on mount

  // GSAP animation
  if (savePlan.value) {
    gsap.fromTo(
      savePlan.value.querySelectorAll("*"),
      { x: '100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 0.7,
        ease: "power1.out",
      }
    );
  }
});
</script>


<style scoped>
.saveplan-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 4rem;
  position: relative;
}

h1 {
  margin-top: 10rem;
  font-size: 2em;
  font-weight: bold;
  color: #f0f0f0;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  color: #f0f0f0;
}

@media (max-width: 768px) {
  .saveplan-container {
    padding: 1rem;
  }

  .grid-item {
    width: 80%;
    height: auto;
    padding: 1rem 2rem;
  }

  h2 {
    font-size: 1.8em;
  }

  p {
    font-size: 1em;
  }

  .cta-text {
    font-size: 1.2em;
  }
}
</style>