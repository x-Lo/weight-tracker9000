<template>
  <div class="account-page">
    <div class="card">
      <!-- User Information -->
      <div class="user-info">
        <div class="user-field">
          <label>Email:</label>
          <input type="text" :value="email" readonly />
        </div>
        <div class="user-field">
          <label>Username:</label>
          <input type="text" :value="store.username" readonly />
        </div>
        <div class="user-field">
          <label>Starting Weight:</label>
          <input type="number" :value="store.resultsData.weight" readonly />
        </div>
        <div class="user-field">
          <label>Goal Weight:</label>
          <input type="number" :value="store.resultsData.goalweight" readonly />
        </div>
        <div class="user-field">
          <label>Current Weight:</label>
          <input type="number" :value="store.resultsData.weight" readonly />
        </div>
        <div class="user-field">
          <label>TDEE (Calories):</label>
          <input type="number" :value="store.resultsData.tdee" readonly />
        </div>
        <div class="user-field">
          <label>Plan Type:</label>
          <input type="text" :value="store.resultsData.typeOfPlan" readonly />
        </div>
        <div class="user-field">
          <label>Phase Duration (Days):</label>
          <input type="number" :value="store.resultsData.phaseDuration" readonly />
        </div>
        <div class="user-field">
          <label>Streak:</label>
          <input type="number" :value="store.resultsData.streak" readonly />
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

  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
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
    justify-content: space-evenly;
    align-items: center;
    padding: 2rem;
  }
  
  .user-info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: left;
    padding: 1rem;
    gap: 1rem;
  }
  
  .user-field label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #C94079;
  }

  input[readonly] {
    background-color: #f0f0f0;
    color: #555;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .account-container {
      padding: 15px;
      max-width: 100%;
    }
  
    .avatar img {
      width: 80px;
      height: 80px;
    }
  
    .user-field input {
      font-size: 14px;
    }
  
    .field-with-button button {
      font-size: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .account-container {
      padding: 15px;
      max-width: 95%;
    }
  
    .avatar img {
      width: 80px;
      height: 80px;
    }
  
    .user-field input {
      font-size: 14px;
    }
  
    .field-with-button button {
      font-size: 12px;
    }
  }
  </style>
  