<template>
  <div class="account-page" ref="account">
    <h1>Account Details</h1>
    <div class="grid">
      <div class="grid-item">
        <h2>Acount Info</h2>
        <div class="user-field">
          <label>Email:</label>
          <input type="text" :value="email" readonly />
        </div>
        <div class="user-field">
          <label>Username:</label>
          <input type="text" :value="store.username" readonly />
        </div>
      </div>
      
      <div class="grid-item">
        <h2>Weight Info</h2>
        <div class="user-field">
          <label>Starting Weight:</label>
          <input type="number" :value="store.resultsData.weight" readonly />
        </div>
        <div class="user-field">
          <label>Goal Weight:</label>
          <input type="number" :value="store.resultsData.goalweight" readonly />
        </div>
        <div class="user-field">
          <label>Curretn Weight:</label>
          <input type="number" :value="store.resultsData.weight" readonly />
        </div>
      </div>
      
      <div class="grid-item">
        <h2>Plan Info</h2>
        <div class="user-field">
          <label>Plan Type:</label>
          <input type="text" :value="store.resultsData.typeOfPlan" readonly/>
        </div>
        <div class="user-field">
          <label>Plan Duration (Days):</label>
          <input type="number" :value="store.resultsData.phaseDuration" readonly />
        </div>
        <div class="user-field">
          <label>Streak:</label>
          <input type="number" :value="store.resultsData.streak" readonly />
        </div>
      </div>
      
      <div class="grid-item">
        <h2>Calorie Info</h2>
        <div class="user-field">
          <label>TDEE (Calories):</label>
          <input type="number" :value="store.resultsData.tdee" readonly />
        </div>
        <div class="user-field">
          <label>{{ store.resultsData.typeOfPlan }} Rate :</label>
          <input type="text" :value="store.resultsData.rate" readonly/>
        </div>
        <div class="user-field">
          <label>Macronutrient Breakdown:</label>
          <div class="macros">
            <p>Protein: {{ store.resultsData.protein }}g</p>
            <p>Carbs: {{ store.resultsData.carbs }}g</p>
            <p>Fats: {{ store.resultsData.fats }}g</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { getAuth } from "firebase/auth";
  import { useAppStore } from "@/stores/appStore";
  import gsap from "gsap";
  
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const store = useAppStore();
  const email = ref(currentUser?.email || "");
  const account = ref<HTMLElement | null>(null);

  onMounted(async() => {
    // animation code
    if (account.value) {
      gsap.fromTo(
        account.value.querySelectorAll("h1, .grid-item"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 1, 
          stagger: 0.2,
          ease: "power1.out" 
        }
      );
    }
  })
  
</script>
  
<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #f0f0f0; /* High contrast */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.5px;
  text-align: center;
}

h2 {
  font-size: 1.7em;
  font-weight: 600;
  color: #f0f0f0;
  text-align: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  position: relative;
}

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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
}

.user-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-field label {
  font-weight: bold;
  color: #c0c0c0;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

input[readonly] {
  border-radius: 6px;
  padding: 0.5rem;
  width: 100%;
  color: #ffffff;
  background: #2b2b2b;
  border: 1px solid #3a3a3a;
  font-size: 1rem;
}

input[readonly]:focus {
  outline: 2px solid #c94079;
}

.macros {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.1rem;
  color: #f0f0f0;
}


@media (max-width: 600px) {
  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  .grid {
    gap: 0.5rem;
  }

  .grid-item {
    padding: 0.8rem;
  }

  input[readonly] {
    font-size: 0.9rem;
    padding: 0.4rem;
  }

  .macros {
    font-size: 0.95rem;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  .grid-item {
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
