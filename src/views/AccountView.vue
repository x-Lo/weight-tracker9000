<template>
    <div class="account-page">
      <div class="card">
        <!-- User Avatar -->
        <div class="avatar">
        </div>
  
        <!-- User Information -->
        <div class="user-info">
          <div class="user-field">
            <label>Email:</label>
            <input type="text" :value="email" readonly />
          </div>
          <div class="user-field">
            <label>Username:</label>
            <input type="text" :value="username" readonly />
          </div>
          <div class="user-field">
            <label>Starting Weight:</label>
            <div class="field-with-button">
              <input 
                :readonly="!isEditingStartingWeight" 
                type="number" 
                v-model="localStartingWeight" 
              />
              <button class="button" @click="toggleEdit('startingWeight')">
                {{ isEditingStartingWeight ? "Save" : "Edit" }}
              </button>
            </div>
          </div>
          <div class="user-field">
            <label>Goal Weight:</label>
            <div class="field-with-button">
              <input 
                :readonly="!isEditingGoalWeight" 
                type="number" 
                v-model="localGoalWeight" 
              />
              <button class="button" @click="toggleEdit('goalWeight')">
                {{ isEditingGoalWeight ? "Save" : "Edit" }}
              </button>
            </div>
          </div>
          <div class="user-field">
            <label>Current Weight:</label>
            <input type="number" v-model="localCurrentWeight" readonly />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  
  export default defineComponent({
    name: "AccountView",
    setup() {
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      const email = ref(currentUser?.email || "");
      const username = ref("");
      const localStartingWeight = ref<number | null>(null);
      const localCurrentWeight = ref<number | null>(null);
      const localGoalWeight = ref<number | null>(null);
      const isEditingStartingWeight = ref(false);
      const isEditingGoalWeight = ref(false);
  
      onMounted(async () => {
        if (currentUser) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", currentUser.uid);
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              username.value = userData.username || "Unknown User";
              localStartingWeight.value = userData.startingWeight || null;
              localGoalWeight.value = userData.goalWeight || null;
              localCurrentWeight.value = userData.currentWeight || null;
            } else {
              console.log("User data not found.");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      });
  
      const toggleEdit = (field: string) => {
        if (field === "startingWeight") {
          isEditingStartingWeight.value = !isEditingStartingWeight.value;
          if (!isEditingStartingWeight.value && localStartingWeight.value !== null) {
            updateWeightInFirestore("startingWeight", localStartingWeight.value);
          }
        } else if (field === "goalWeight") {
          isEditingGoalWeight.value = !isEditingGoalWeight.value;
          if (!isEditingGoalWeight.value && localGoalWeight.value !== null) {
            updateWeightInFirestore("goalWeight", localGoalWeight.value);
          }
        }
      };
  
      const updateWeightInFirestore = async (field: string, value: number) => {
        if (currentUser) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", currentUser.uid);
          try {
            await updateDoc(userDocRef, {
              [field]: value,
            });
            console.log(`${field} updated successfully.`);
          } catch (error) {
            console.error(`Error updating ${field}:`, error);
          }
        }
      };
  
      return {
        email,
        username,
        localStartingWeight,
        localGoalWeight,
        localCurrentWeight,
        isEditingStartingWeight,
        isEditingGoalWeight,
        toggleEdit,
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
  }
  
  .avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto 20px;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
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
  
  .user-field input {
    cursor: none;
  }
  
  input[readonly] {
    background-color: #f0f0f0;
    color: #555;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .field-with-button {
    display: flex;
    gap: 10px;
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
  