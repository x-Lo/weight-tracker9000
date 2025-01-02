<template>
    <div class="dailyweight-page">
        <div class="dailyweight-container">
            <div class="hero">
                <h1>Welcome, <span class="brand-name">{{ username }}</span>!</h1>
                <p>Stay on track by submitting your weight for today.</p>
            </div>

            <div class="submit-form card">
                <input
                    type="number"
                    class="input"
                    v-model="currentWeightInput"
                    placeholder="Enter your current weight (kg)"
                    :disabled="weightSubmitted"
                />
                <button
                    class="button secondary"
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

            <div class="calendar-link">
                <p>Check out your progress on the calendar!</p>
                <button class="button secondary" @click="$router.push('/calendar')">Go to Calendar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, collection, serverTimestamp, query, where, getDocs,  updateDoc } from "firebase/firestore";

export default defineComponent({
  setup() {
    const auth = getAuth();
    const isLoggedIn = ref(false);
    const username = ref("");
    const currentWeightInput = ref("");
    const weightSubmitted = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const currentUser = auth.currentUser;

    const db = getFirestore();

    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          isLoggedIn.value = true;

          const userDocRef = doc(db, "users", user.uid);
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              username.value = userData.username || "User";
              await checkWeightSubmitted(user.uid);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    const checkWeightSubmitted = async (userId: string) => {
      try {
        const weightEntriesRef = collection(db, "users", userId, "weightEntries");
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const q = query(
          weightEntriesRef,
          where("timestamp", ">=", todayStart),
          where("timestamp", "<=", todayEnd)
        );

        const querySnapshot = await getDocs(q);
        weightSubmitted.value = !querySnapshot.empty;
      } catch (error) {
        console.error("Error checking weight submission:", error);
      }
    };

    const submitWeight = async () => {
      if (!auth.currentUser) {
        errorMessage.value = "User not authenticated.";
        return;
      }

      const weight = parseFloat(currentWeightInput.value);
      if (isNaN(weight) || weight <= 0) {
        errorMessage.value = "Please enter a valid weight.";
        return;
      }

      try {
        const weightEntriesRef = collection(db, "users", auth.currentUser.uid, "weightEntries");
        await addDoc(weightEntriesRef, {
          weight,
          timestamp: serverTimestamp(),
        });
        updateWeightInFirestore("currentWeight", weight);
        successMessage.value = "Weight submitted successfully!";
        weightSubmitted.value = true;
        currentWeightInput.value = "";
      } catch (error) {
        console.error("Error submitting weight:", error);
        errorMessage.value = "Failed to submit weight. Please try again.";
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
      isLoggedIn,
      username,
      currentWeightInput,
      weightSubmitted,
      submitWeight,
      successMessage,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.dailyweight-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem; /* Increased gap for better spacing */
  padding: 30px; /* More padding for breathing room */
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  border-radius: 12px; /* Slightly larger corners */
  /*border: 3px solid #FF8C42;*/
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* More prominent shadow */
  width: 100%;
  max-width: 600px; /* Larger max width */
  margin: 3em auto;
}

.brand-name {
  color: #FF8C42;
  font-weight: bold;
  font-size: 2rem; /* Emphasize the brand name */
}

.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem; /* Add spacing between title and subtitle */
}

.hero h1 {
  font-size: 2.5rem; /* Larger heading */
  margin-bottom: 0.5rem;
  color: #C94079;
}

.hero p {
  font-size: 1.25rem; /* Larger subtitle for clarity */
  color: #C94079;
}

.submit-form.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem; /* More padding for a larger feel */
  gap: 1rem; /* Add spacing between elements */
}

.calendar-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}

.calendar-link p {
  font-size: 1.25rem; /* Larger text */
  color: #C94079;
  display: block;
}

.info-message {
  font-size: 1rem; /* Larger, yet readable */
  color: #f0f0f0;
  text-align: center;
}
</style>