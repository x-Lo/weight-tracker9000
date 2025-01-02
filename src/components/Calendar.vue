<template>
    <div class="calendar-page">
      <div class="calendar-container">
        <VCalendar class="v-calendar" :color="selectedColor" :attributes="calendarAttributes" expanded borderless transparent/>
      </div>
      <div class="info-grid">
        <div class="grid-item days"> Days Remaining: {{ resultsData.phaseDuration - resultsData.streak }}</div>
        <div class="grid-item streak">Current Streak: {{ resultsData.streak }}</div>
        <div class="grid-item goal"></div>
      </div>
    </div>
</template>
  
<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useAppStore } from "@/stores/appStore";
  
  export default defineComponent({
    name: "Calendar",
    setup() {
      const store = useAppStore();
      const resultsData = computed(() => store.resultsData);
      const calendarAttributes = computed(() => store.calendarAttributes);
      const selectedColor = ref("gray"); // Soft blue color for events/cursor highlight
  
      return {
        resultsData,
        selectedColor,
        calendarAttributes,
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
  justify-content: flex-start;
  gap: 2rem;
}

.grid-item {
  width: 40vh;
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
</style>
  