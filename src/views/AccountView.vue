<template>
  <div class="account-page">
    <h1>ACCOUNT DETAILS</h1>
    <div class="grid">
      <div class="grid-item">
        <div class="user-field">
          <label>EMAIL:</label>
          <input type="text" :value="email" readonly />
        </div>
        <div class="user-field">
          <label>USERNAME:</label>
          <input type="text" :value="store.username" readonly />
        </div>
      </div>
      <div class="grid-item">
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
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}

h1 {
  font-size: 2em;
  color: #f0f0f0;
}

.grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 100%;
  max-width: 1400px; /* Increased max width to allow more space */
}

.grid-item {
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem; /* Increased padding for better proportions */
  align-items: flex-start;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
}

.grid-item:hover {
  border: 1px solid #c94079;
  box-shadow: 0 6px 15px rgba(201, 64, 121, 0.7);
}

.user-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input[readonly] {
  border-radius: 8px;
  padding: 0.7rem; /* Adjusted padding for larger fields */
  width: 100%;
  color: #f0f0f0;
}

.user-field label {
  font-weight: bold;
  color: #c94079;
}

.macros {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.2em;
  color: #f0f0f0;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .grid-item {
    align-items: center;
  }

  .macros {
    align-items: center;
    text-align: center;
  }
}
</style>