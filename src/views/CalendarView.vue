<template>
    <div class="calendar-page">
      <div class="calendar-div">
        <VCalendar :color="selectedColor" :attributes="calendarAttributes" expanded/>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { useAppStore } from "@/stores/appStore";
  
  export default defineComponent({
    name: "CalendarView",
    setup() {
      const store = useAppStore();
      const resultsData = computed(() => store.resultsData);
      const calendarAttributes = computed(() => store.calendarAttributes);
      const selectedColor = ref("#4682b4"); // Soft blue color for events/cursor highlight
  
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
    flex-direction: row;
    height: 100vh;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(to bottom right, #191919, #2c2c2c);
    background-size: cover;
    padding: 1rem;
  }
  
  .calendar-div {
    flex: 1;
    max-width: 50%;
    height: 40vh; /* Half of the viewport height */
    border-radius: 10px;
    background: #2c2c2c; /* Match gradient color scheme */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }
  
  
  </style>
  