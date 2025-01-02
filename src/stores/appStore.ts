// stores/appStore.ts
import { defineStore } from "pinia";

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
  }
}); 