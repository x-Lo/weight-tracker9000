<template>
  <div class="calcpage-container">  
    <!-- Right Section: Grid -->
    <!-- Dynamic component -->
    <div class="right-container">
      <Calculator />
    </div>


    <!-- Left Section: Quote -->
    <div class="hidden" v-show="store.isHiddenVisible">
      <Results />
    </div>
    <div class="left-container" v-show="!store.isHiddenVisible">
      <p>The first step we need to take is to calculate your maintenance calories</p>
      <p>The calculator will do that by using the Mifflin-St Jeor Formula, which is widely known to be the most accurate.</p>
      <p>Based on that data, we will configure a weight plan just for you</p>
      <p>With goal weight, calories and even macronutrients included!</p>
    </div>

    <!--<div class="spinning-triangle-wrapper">
      <SpinningTriangle />
    </div>-->
  </div>
</template>

<script lang="ts">
import SpinningTriangle from "@/components/SpinningTriangle.vue";
import Results from "@/components/Results.vue";
import { useAppStore } from '@/stores/appStore';
import Calculator from "@/components/Calculator.vue";
import { onBeforeRouteLeave } from 'vue-router';
import { ref } from "vue";

export default {
  name: "CalculatorView",
  components: {
    SpinningTriangle,
    Calculator,
    Results,
  },
  setup() {
    const store = useAppStore();

    onBeforeRouteLeave(() => {
      store.resetVisibility(); // Reset on page change
    });

    return {
      store, // Return the whole store to access properties reactively
    };
  },
};
</script>

<style scoped>
/* Flex container for the homepage layout */
.calcpage-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom right, #191919, #2c2c2c);
  background-size: cover;
}

.left-container {
  flex: 0 0 65%; /* Fixed width ratio (80%) */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centers content within the div */
  background: transparent;
  position: relative;
}

.hidden {
  flex: 0 0 65%; /* Fixed width ratio (80%) */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centers content within the div */
  background: transparent;
  position: relative;
}

.card {
  background: rgba(39, 39, 39, 0.1);
}

.spinning-triangle-wrapper {
  position: absolute;
  left: 65%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.spinning-triangle-wrapper :deep(.circle) {
  border: 3px solid #FF8C42;
}

.spinning-triangle-wrapper :deep(.triangle) {
  border-top: 45px solid #FF8C42; /* Triangle color */
}

/* Right Section: Grid */
.right-container {
  flex: 0  0 35%; /* Fixed width ratio (20%) */
  height: 100%;
  display: flex;
  flex-direction: column; /* Stacks items vertically */
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 1rem;
  background: transparent;
  background-size: cover;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #f0f0f0;
  position: relative;
}
</style>
