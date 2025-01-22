<template>
  <div class="dailyweight-page" ref="dailyweight">
    <h1>Welcome, <span class="user-name"> {{store.username}} </span>!</h1>
    <h2>Stay on track by submitting your weight for today.</h2>
    <div class="submit-form">
        <input
          type="number"
          class="input"
          v-model="currentWeightInput"
          placeholder="Enter your current weight (kg)"
          :disabled="store.weightSubmitted"
        />
        <button
          class="button"
          @click="submitWeight"
          :disabled="store.weightSubmitted">
          Submit
        </button>
        <p
          v-show="store.weightSubmitted"
          class="info-message"
          ref="infoMessage"  >
          You've already logged your weight for the day!
        </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch } from "vue";
  import { useAppStore } from "@/stores/appStore";
  import gsap from "gsap";

  const store = useAppStore();
  const dailyweight = ref<HTMLDivElement | null>(null);
  const infoMessage = ref<HTMLElement | null>(null);

  const currentWeightInput = ref("");
  const successMessage = ref("");
  const errorMessage = ref("");
  const today = new Date();

  // Format Date to 'YYYY-MM-DD'
  const formatDate = (date: Date) => date.toISOString().split("T")[0]
  const checkIfWeightSubmittedToday = async () => {
    const todayFormatted = formatDate(today);

    // Fetch user data from Firestore
    await store.fetchUserData(store.userId);
    console.log("Fetched calendarAttributes:", store.calendarAttributes);

    // Check if any calendar attribute has today's date
    store.weightSubmitted = store.calendarAttributes.some((attr: any) => {
      let formattedDate;

      if (attr.dates instanceof Date) {
        // If 'dates' is already a Date object
        formattedDate = formatDate(attr.dates);
      } else if (attr.dates instanceof Object && "toDate" in attr.dates) {
        // If 'dates' is a Firestore Timestamp
        formattedDate = formatDate(attr.dates.toDate());
      } else {
        console.error("Unsupported date format in attribute:", attr.dates);
        return false; // Skip this attribute
      }

      console.log(`Comparing Firestore date ${formattedDate} with today's date ${todayFormatted}`);
      return formattedDate === todayFormatted;
    });

    console.log("weightSubmitted:", store.weightSubmitted); // Log the final state
  };


  const submitWeight = async () => {
    if (store.weightSubmitted) {
      errorMessage.value = "You've already logged your weight for today!";
      return;
    }

    // Create a new calendar attribute for today's weight entry
    const newAttribute = {
      dates: today, // Save Date directly; Firestore handles timestamps
      popover: {
        label: "Daily Weight Measurement: " + currentWeightInput.value,
      },
      dot: {
        color: "pink",
      },
    };

    const updatedAttributes = [...store.calendarAttributes, newAttribute];
    store.setCalendarAttributes(updatedAttributes);
    store.updateResultsProperty("currentWeight", currentWeightInput.value);
    store.updateResultsProperty("lastSubmissionDate", today);
    store.updateResultsProperty("streak", store.resultsData.streak + 1);

    store.weightSubmitted = true;
    console.log("weightSubmitted after submission:", store.weightSubmitted);
    await store.saveUserData();

    successMessage.value = "Weight logged successfully!";
    currentWeightInput.value = "";

    if (infoMessage.value) {
      gsap.fromTo(
        infoMessage.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };  

  onMounted(async () => {
    await checkIfWeightSubmittedToday();
    console.log("Final weightSubmitted state after page load:", store.weightSubmitted);
    if (!store.weightSubmitted) {
      const lastSubmissionDate = store.resultsData.lastSubmissionDate || null;

      if (lastSubmissionDate) {
        const lastDate = new Date(lastSubmissionDate);
        const diffInDays = Math.floor(
          (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays > 1) {
          store.updateResultsProperty("streak", 0);
        }
      } else {
        store.updateResultsProperty("streak", 0);
      }
    }

    // animation code
    if (dailyweight.value) {
      gsap.fromTo(
        dailyweight.value.querySelectorAll("*"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 1, 
          ease: "power1.out" 
        }
      );
    }
  });
</script>



<style scoped>
.dailyweight-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 2rem;
  position: relative;
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #f0f0f0;
}

h2 {
  font-size: 2em;
  font-weight: bold;
  color: #f0f0f0;
}

.user-name {
  color: #c94079;
  font-weight: bold;
}

.submit-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  width: 40vh;
}

.info-message {
  font-size: 1rem; /* Larger, yet readable */
  color: #f0f0f0;
  text-align: center;
  margin-top: 1rem;
}

.button {
  border-radius: 15px;
}

@media (min-width: 600px) and (max-width: 767px) {
  .submit-form {
    width: 70vh;
  }
}
</style>