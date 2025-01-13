<template>
    <div class="calendar-page">
      <div class="calendar-container">
        <VCalendar class="v-calendar" :color="selectedColor" :attributes="calendarAttributes" expanded borderless transparent/>
      </div>
      <div class="info-grid">
        <div class="grid-item days"> 
          <div class="days-section">
            <h2>Days Remaining: </h2>
            <span class="days-value">{{ daysRemaining }}</span>
            <span class="days-label" style="">DAYS</span>
          </div>
        </div>
        <div class="grid-item streak">
          <div class="days-section">
            <h2>Current Streak: </h2>
            <span class="days-value">{{ resultsData.streak }}</span>
            <span class="days-label" style="">DAYS</span>
          </div>
        </div>
        <div class="grid-item goal">
          <div class="goal-section">
            <h2>Have your results slowed down?</h2>
            <h3>Reconfigure your plan!</h3>
            <button class="button" @click="navigate('calculator')">Reconfigure</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useAppStore } from "@/stores/appStore";
  import { useNavigation } from '@/composables/useNavigation';
  
  export default defineComponent({
    name: "Calendar",
    setup() {
      const store = useAppStore();
      const { navigate } = useNavigation(); // Use the composable
      const resultsData = computed(() => store.resultsData);
      const calendarAttributes = computed(() => store.calendarAttributes);
      const selectedColor = ref("pink"); // Soft blue color for events/cursor highlight

      const planStartDate = new Date(store.resultsData.startDate ?? new Date()); // Ensure you have this property in your resultsData.
      const today = new Date(); // Current date

      // Calculate days passed
      const daysPassed = Math.floor(
        (today.getTime() - planStartDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Compute days remaining
      const daysRemaining = computed(() => {
        return store.resultsData.phaseDuration - daysPassed;
      });

      return {
        resultsData,
        selectedColor,
        calendarAttributes,
        daysRemaining,
        navigate,
      };
    },
  });
</script>
  
<style scoped>
.calendar-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
}
    
.calendar-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.info-grid {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 2rem;
}

.grid-item {
  width: 40vh;
  height: 50vh;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
  color: #f0f0f0;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
}

.days-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  flex-grow: 1;
}

.days-value {
  margin-top: 3rem;
  font-size: 4rem;
  font-weight: bold;
}

.days-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.goal-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .info-grid{
    flex-direction: column;
    align-items: center;
  }

  .info-grid {
    gap: 0.5rem;
  }

  .grid-item {
    width: 40vh;
    height: 15vh;
    font-size: 0.8rem;
    margin: 0;
  }

  .days-value {
    font-size: 1rem;
    margin: 0;
  }
}
</style>
  