<template>
    <div class="main-container">
        <div class="infoheader">
            <h1>Welcome to Weight Tracker 9000.</h1>
            <h2 class="middle color">Let's set up your next fitness journey!</h2>
            <h2>What is your goal?</h2>
        </div>
        <div class="plans-grid">
            <div class="grid-item choose-plan" @click="redirect('Fat Loss')">FAT LOSS</div>
            <div class="grid-item calendar" @click="redirect('Maintenance')">MAINTENANCE</div>
            <div class="grid-item account" @click="redirect('Muscle Gain')">MUSCLE GAIN</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const planType = ref("");

export default defineComponent({
    name: "ChoosePlanView",
    methods: {
    redirect(type: string) {
      this.$router.push(`/calculator`);
      planType.value = type;
    }
  }
});
</script>

<style scoped>
.main-container{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.infoheader h1{
  margin: 2em;
  color: #C94079;
  font-style: italic;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.middle.color{
  color: #E4665D;
}

.infoheader h2{
  margin: 2em;
  color: #FF8C42;
  font-style: italic;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

/* Define the grid layout */
.plans-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 80%;
  max-width: 800px;
  gap: 1.5rem; /* Spacing between grid items */
  justify-content: center; /* Align content horizontally */
  align-content: center; /* Align content vertically */
}

/* Individual grid items */
.grid-item {
  flex: 1; /* Flexible width, half the container minus gap */
  height: 5rem;
  max-width: calc(33.33% - 1rem); /* Ensures equal width */
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #C94079;
  text-align: center;
  padding: 2rem;
  transition: transform 0.2s, background-color 0.2s;
}

.grid-item:hover {
  transform: translateY(-5px); /* Lift effect */
  cursor: pointer;
}
</style>