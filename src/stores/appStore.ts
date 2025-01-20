// stores/appStore.ts
import { defineStore } from "pinia";
import { db,  } from "@/firebase";
import { doc, setDoc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'

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
      startDate: null  as Date | null,
      currentWeight: 0,
      streak: 0,
      lastSubmissionDate: null  as Date | null,
    },
    userId: null as string | null, // Authenticated user ID
    username: null as string | null,
    weightSubmitted:  false,
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
      if (userId) {
        localStorage.setItem("userId", userId); // Persist userId
      } else {
        localStorage.removeItem("userId"); // Clear userId on logout
      }
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
            startDate: this.resultsData.startDate instanceof Date 
           ? this.resultsData.startDate
           : new Date(), // Default to now if invalid
          },
          username: this.username,
          weightSubmitted: this.weightSubmitted,
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
    
          // Parse Firestore Timestamps and ISO strings back to Date objects
          const resultsData = userData.resultsData || {};
          resultsData.startDate = this.convertToDate(resultsData.startDate);
          resultsData.lastSubmissionDate = this.convertToDate(resultsData.lastSubmissionDate);
    
          this.$patch({
            dailyWeights: (userData.dailyWeights || []).map((weight: any) => ({
              ...weight,
              dates: this.convertToDate(weight.dates), // Handle dates for each weight entry
            })),
            calendarAttributes: (userData.calendarAttributes || []).map((attr: any) => ({
              ...attr,
              dates: this.handleNestedDates(attr.dates), // Recursively process dates
            })),
            resultsData,
            username: userData.username || '',
            weightSubmitted: userData.weightSubmitted || 0,
          });
    
          console.log("User data loaded:", userData);
        } else {
          console.warn("No user data found for ID:", userId);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    
    // Reset user data for plan reconfiguration
    async resetUserData() {
      // Get the currently logged-in user
      const userId = this.userId;

      if (!userId) {
          console.error("No user is currently logged in.");
          return;
      }
  
      const userDocRef = doc(db, "users", userId);

      try {
          // Retrieve the user document from Firestore
          const userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) {
              console.error("User document does not exist.");
              return;
          }
  
          // Reset all fields except userId and username
          await updateDoc(userDocRef, {
              dailyWeights: [],
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
                  startDate: null,
                  currentWeight: 0,
                  streak: 0,
                  lastSubmissionDate: null,
              },
              weightSubmitted: false,
          });

          const preservedUsername = this.username;
          const preservedUserId = this.userId;
          this.$reset(); //reset the pinia store
          this.username = preservedUsername;
          this.userId = preservedUserId;
  
          console.log("User data reset successfully except for username and userId.");
      } catch (error) {
          console.error("Error resetting user data:", error);
      }
    },

    // Helper function to handle date conversion
    convertToDate(value: any): Date | null {
      if (value instanceof Timestamp) {
        return value.toDate(); // Convert Firestore Timestamp to JS Date
      } else if (typeof value === 'string') {
        return new Date(value); // Convert ISO string to JS Date
      } else if (value === null || value === undefined) {
        return null; // Keep null or undefined as is
      }
      return value; // Return original value if not a known date type
    },

    handleNestedDates(value: any): any {
      if (value instanceof Timestamp) {
        return value.toDate(); // Convert Firestore Timestamp to JS Date
      } else if (typeof value === 'string') {
        return new Date(value); // Convert ISO string to JS Date
      } else if (value && typeof value === 'object') {
        // Recursively process nested objects
        const processed: any = {};
        for (const key in value) {
          processed[key] = this.handleNestedDates(value[key]); // Process each key
        }
        return processed;
      }
      return value; // Return original value for other types
    },
    
    // user data reset method
    logout() {
      this.$reset(); // Reset all state to initial values
      localStorage.removeItem("userId"); // Clear persisted userId
    }
  },
  persist: {
    key: "app-store",
    storage: localStorage,
  },
}); 