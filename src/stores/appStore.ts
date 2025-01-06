// stores/appStore.ts
import { defineStore } from "pinia";
import { db,  } from "@/firebase";
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    dailyWeights: [] as Array<{
      description: string;
      isComplete: boolean;
      dates: string; // Store as ISO string
      color: string;
    }>,
    calendarAttributes: [],
    resultsData: {
      hidden: true,
      gender: '',
      age: 0,
      weight: 0,
      height: 0,
      activityLevel: '',
      typeOfPlan: '',
      tdee: 0,
      rate: '',
      goalweight: null,
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      phaseDuration: 0,
      startDate: new Date(),
      currentWeight: 0,
      streak: 0,
      lastSubmissionDate: null,
    },
    userId: null, // Authenticated user ID
    username: "",
  }),
  actions: {
    // Update the entire resultsData object
    updateData(data: any) {
      this.resultsData = data;
    },

    // Update userId and username
    updateUser(userId: any, username :string) {
      this.userId = userId;
      this.username = username;
    },

    // Update specific properties in resultsData
    updateResultsProperty(property: keyof typeof this.resultsData, value: any) {
      this.$patch({
        resultsData: {
          [property]: value,
        },
      });
    },

    // Set `hidden` to true or false
    toggleHiddenState(hidden: boolean) {
      this.$patch({
        resultsData: {
          hidden,
        },
      });
    },

    setCalendarAttributes(attributes: any) {
      this.calendarAttributes = attributes;
    },

    getCalendarAttributes() {
      return this.calendarAttributes;
    },

    /* Saving the user data to the firestore */
    async saveUserData() {
      const userId = this.userId;
      if (!userId) throw new Error("User ID is not set!");

      try {
        const userDoc = doc(db, "users", userId);
        const dataToSave = {
          dailyWeights: this.dailyWeights,
          calendarAttributes: this.calendarAttributes,
          resultsData: {
            ...this.resultsData,
            startDate: this.resultsData.startDate?.toISOString(), // Convert to ISO
          },
          username: this.username,
        };
        await setDoc(userDoc, dataToSave, { merge: true });
        console.log("User data saved successfully.");
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    },

    /* fetching user data from firestore */
    async fetchUserData(userId: any) {
      this.userId = userId;
      if (!userId) throw new Error("User ID is not set!");

      try {
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          // Parse date strings back to Date objects where necessary
          // Convert resultsData startDate back to Date object if necessary
          if (userData.resultsData.startDate instanceof Timestamp) {
            userData.resultsData.startDate = userData.resultsData.startDate.toDate();
          }

          // Convert calendarAttributes dates to JavaScript Date objects
          const convertedCalendarAttributes = (userData.calendarAttributes || []).map((attr: any) => {
            if (typeof attr.dates === 'string') {
              attr.dates = new Date(attr.dates);
            } else if (attr.dates?.start && attr.dates?.end) {
              attr.dates.start = new Date(attr.dates.start);
              attr.dates.end = new Date(attr.dates.end);
            }
            return attr;
          });

          this.$patch({
            dailyWeights: userData.dailyWeights || [],
            calendarAttributes: convertedCalendarAttributes,
            resultsData: userData.resultsData || {},
            username: userData.username || '',
          });

          console.log("User data loaded:", userData);
        } else {
          console.warn("No user data found for ID:", userId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    // user data reset method
    logout() {
      this.$reset(); // Reset all state to initial values
    }
  }
}); 