<template>
  <div class="info-page" v-if="resultsData.hidden">
    <div class="info-step">
      <h1>The first step we need to take is to calculate your maintenance calories.</h1>
    </div>
    <div class="info-step">
      <h2>
        The calculator will do that by using the Mifflin-St Jeor Formula, which is widely known to be the most accurate.
      </h2>
    </div>
    <div class="info-step">
      <h3>Based on that data, we will configure a weight plan just for you.</h3>
    </div>
    <div class="info-step">
      <h4>With goal weight, calories, and even macronutrients included!</h4>
    </div>
  </div>

  <div class="results-page" v-else>
    <h1>Your results:</h1>
    <div class="results-grid">
      <div class="grid-item calories">
        <h2>Your Maintenance Calories:</h2>
        <div class="calorie-section">
          <span class="calories-value">{{ resultsData.tdee }}</span>
          <span class="calories-label">calories per day</span>
        </div>
        <div class="calorie-section" style="border: none;">
          <span class="calories-value">{{ resultsData.tdee ? resultsData.tdee * 7 : '-' }}</span>
          <span class="calories-label">calories per week</span>
        </div>
      </div>
      <div class="grid-item plan">
        <h2>What Is Your Goal?</h2>
        <div class="plan-section">
          <div class="plan-grid">
            <div class="grid-item fatloss" @click="updatePlanType" id="FAT LOSS">FAT LOSS</div>
            <div class="grid-item maintenance" @click="updatePlanType" id="MAINTENANCE">MAINTENANCE</div>
            <div class="grid-item musclegain" @click="updatePlanType" id="MUSCLE GAIN">MUSCLE GAIN</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useNavigation } from '@/composables/useNavigation';
import { useAppStore } from '@/stores/appStore';

export default defineComponent({
  setup() {
    const { navigate } = useNavigation(); // Use the composable
    const store = useAppStore();
    

    const resultsData = computed(() => store.resultsData);

    const updatePlanType = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement.id) {
        console.time('updateResultsProperty');
        store.updateResultsProperty('typeOfPlan', clickedElement.id.trim());
        console.timeEnd('updateResultsProperty');
      }
      console.time('navigate');
      navigate('personal');
      console.timeEnd('navigate');
    };

    return { navigate, resultsData, updatePlanType, store };
  },
});
</script>

<style scoped>
/* General Page Styling */
.results-page {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #f0f0f0;
}

.info-page {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center; /* Centers content horizontally */
  text-align: center;
  gap: 2rem; /* Space between sections */
  padding: 2rem; /* Adds breathing room around the container */
  max-width: 800px; /* Limits content width for readability */
  margin: 0 auto; /* Centers the container on the page */
}

.info-step {
  padding: 1rem 2rem; /* Adds space around each step for visual clarity */
}

.results-page h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff; /* High contrast */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.5px;
  position: relative;
  text-align: center;
  margin-top: 1rem;
}

.results-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
}

.grid-item {
  width: 50vh;
  background: rgba(39, 39, 39, 0.1);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.4rem;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
  color: #f0f0f0;
}

.plan-section {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
}

.plan-grid {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
}

.plan-grid .grid-item{
  width:  30vh;
  font-size: 1.2em;
  border: none;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.plan-grid .grid-item:hover {
  outline-color: #C94079; /* Solid color for active state */
  box-shadow: 0 2px 0 rgba(201, 64, 121, 0.8);
}

.calorie-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.calories-value {
  font-size: 4rem;
  font-weight: bold;
}

.calories-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #f0f0f0;
}

.plan-grid .grid-item:hover {
  cursor: pointer;
}
</style>
