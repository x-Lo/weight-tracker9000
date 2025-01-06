<template>
    <div class="dailyweight-page">
        <h1>Welcome, <span class="user-name"> {{store.username}} </span>!</h1>
        <h2>Stay on track by submitting your weight for today.</h2>
            <div class="submit-form">
                <input
                    type="number"
                    class="input"
                    v-model="currentWeightInput"
                    placeholder="Enter your current weight (kg)"
                    :disabled="weightSubmitted"
                />
                <button
                    class="button"
                    @click="submitWeight"
                    :disabled="weightSubmitted">
                    Submit
                </button>
                <p v-if="weightSubmitted" class="info-message">
                    You've already logged your weight for the day!
                </p>
            </div>

            <div class="feedback-messages">
                <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useAppStore } from "@/stores/appStore";

export default defineComponent({
  setup() {
    const store = useAppStore();

    const currentWeightInput = ref("");
    const weightSubmitted = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format

    // Function to check if a weight was submitted today
    const checkIfWeightSubmittedToday = () => {
      weightSubmitted.value = store.calendarAttributes.some((attr: any) => {
        if (typeof attr.dates === "string") {
          return attr.dates === today; // Compare directly if `dates` is a string
        }
        if (Array.isArray(attr.dates)) {
          return attr.dates.includes(today); // Check for inclusion if `dates` is an array
        }
        return false; // Fallback for unexpected structures
      });
    };

    // Function to validate the streak
    const validateStreak = () => {
      const lastSubmissionDate = store.resultsData.lastSubmissionDate;
      if (!lastSubmissionDate) {
        // No previous submissions; streak should start from 0
        store.updateResultsProperty("streak", 0);
        return;
      }

      // Calculate difference in days between the last submission and today
      const lastSubmission = new Date(lastSubmissionDate);
      const currentDay = new Date(today);

      const differenceInDays = Math.floor(
        (currentDay.getTime() - lastSubmission.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays > 1) {
        // Missed one or more days; reset streak to 0
        store.updateResultsProperty("streak", 0);
      }
    };

    // Function to handle weight submission
    const submitWeight = () => {
      if (weightSubmitted.value) {
        errorMessage.value = "You've already logged your weight for today!";
        return;
      }

      // Create a new calendar attribute for today's weight entry
      const newAttribute = {
        dates: today,
        popover: {
          label: "Daily Weight Measurement: " + currentWeightInput.value,
        },
        dot: {
          color: "gray", // Dot color
        },
      };

      // Add the new attribute to the existing attributes
      const updatedAttributes = [...store.calendarAttributes, newAttribute];

      // Update the store with the new calendar attributes
      store.setCalendarAttributes(updatedAttributes);

      // Update the current weight in the store
      store.updateResultsProperty("currentWeight", currentWeightInput.value);

      // Update the streak
      const currentStreak = store.resultsData.streak + 1;
      store.updateResultsProperty("streak", currentStreak);

      // Update the last submission date
      store.updateResultsProperty("lastSubmissionDate", today);

      // Set success message and mark today's weight as submitted
      successMessage.value = "Weight logged successfully!";
      weightSubmitted.value = true;
      currentWeightInput.value = ""; // Clear the input

      // save the user data on the firestore
      store.saveUserData();
    };

    // Validate streak and check if today's weight is already logged on page load
    onMounted(() => {
      validateStreak();
      checkIfWeightSubmittedToday();
    });

    return {
      currentWeightInput,
      weightSubmitted,
      submitWeight,
      successMessage,
      errorMessage,
      store,
    };
  },
});
</script>


<style scoped>
.dailyweight-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 1rem;
}

.user-name {
  color: #FF8C42;
  font-weight: bold;
  font-size: 2rem; /* Emphasize the brand name */
}

.submit-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  width: 40vh;
}

.info-message {
  font-size: 1rem; /* Larger, yet readable */
  color: #f0f0f0;
  text-align: center;
  margin-top: 2rem;
}

.feedback-messages {
  margin-bottom: 4rem;
}
</style>