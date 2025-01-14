<template>
  <div class="account-page">
    <h1>ACCOUNT DETAILS</h1>
    <div class="grid">
      <div class="grid-item">
        <h2>ACCOUNT INFO</h2>
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
        <h2>WEIGHT INFO</h2>
        <div class="user-field">
          <label>STARTING WEIGHT:</label>
          <input type="number" :value="store.resultsData.weight" readonly />
        </div>
        <div class="user-field">
          <label>GOAL WEIGHT:</label>
          <input type="number" :value="store.resultsData.goalweight" readonly />
        </div>
        <div class="user-field">
          <label>CURRENT WEIGHT:</label>
          <input type="number" :value="store.resultsData.weight" readonly />
        </div>
      </div>
      
      <div class="grid-item">
        <h2>PLAN INFO</h2>
        <div class="user-field">
          <label>PLAN TYPE:</label>
          <input type="text" :value="store.resultsData.typeOfPlan" readonly style="text-transform: lowercase;"/>
        </div>
        <div class="user-field">
          <label>PHASE DURATION (DAYS):</label>
          <input type="number" :value="store.resultsData.phaseDuration" readonly />
        </div>
        <div class="user-field">
          <label>STREAK:</label>
          <input type="number" :value="store.resultsData.streak" readonly />
        </div>
      </div>
      
      <div class="grid-item">
        <h2>CALORIE INFO</h2>
        <div class="user-field">
          <label>TDEE (CALORIES):</label>
          <input type="number" :value="store.resultsData.tdee" readonly />
        </div>
        <div class="user-field">
          <label>MACRONUTRIENT BREAKDOWN:</label>
          <div class="macros">
            <p>PROTEIN: {{ store.resultsData.protein }}g</p>
            <p>CARBS: {{ store.resultsData.carbs }}g</p>
            <p>FATS: {{ store.resultsData.fats }}g</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { getAuth } from "firebase/auth";
  import { useAppStore } from "@/stores/appStore";
  
  export default defineComponent({
    name: "AccountView",
    setup() {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const store = useAppStore();
      const email = ref(currentUser?.email || "");
  
  
      return {
        email,
        store,
      };
    },
  });
</script>
  
<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 3rem;
  gap: 3rem;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  background: url('../assets/hhhorizon.svg');
  background-size: cover;
  background-color: #191919;
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff; /* High contrast */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.5px;
  position: relative;
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
  background: linear-gradient(90deg, #c94079, #ff8c42);
  border-radius: 2px;
}

.grid {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  height: 100vh;
  min-width: 1200px; /* Responsive width limit */
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  width: calc(33.333% - 1rem);
  min-width: 280px;
  height: 60vh;
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
  text-transform: uppercase;
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
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .grid {
    flex-direction: column;
    gap: 1rem;
  }

  .grid-item {
    width: 100%;
    align-items: center;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>