<template>
  <div class="calc-container" ref="calc">
    <h1>Let's get started!</h1>
    <div class="card">
      <form @submit.prevent="calculateTDEE">
        <!-- Unit Toggle -->
        <div class="form-group">
          <div class="unit-switch">
            <a 
              href="#" 
              :class="{ active: unitSystem === 'metric' }" 
              @click.prevent="switchTo('metric')">Metric</a>
            |
            <a 
              href="#" 
              :class="{ active: unitSystem === 'imperial' }" 
              @click.prevent="switchTo('imperial')">Imperial</a>
          </div>
        </div>

        <!-- Gender Selection -->
        <div class="form-group">
          <label>Gender:</label>
          <div class="radio">
            <div>
              <input 
                type="radio" 
                id="male" 
                value="Male" 
                v-model="gender" 
              />
              <label for="male">Male</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="female" 
                value="Female" 
                v-model="gender" 
              />
              <label for="female">Female</label>
            </div>
          </div>
        </div>

        <!-- Age Input -->
        <div class="form-group">
          <label for="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            v-model.number="age" 
            placeholder="Enter your age" 
            required 
          />
        </div>

        <!-- Weight and Height -->
        <div class="form-row">
          <div class="form-group">
          <label for="weight">Weight:</label>
            <input 
              type="number" 
              id="weight" 
              v-model.number="weight"
              :placeholder="weightPlaceholder"
              required 
            />
          </div>
          <div class="form-group">
            <label for="height">Height:</label>
            <div v-if="unitSystem === 'metric'">
              <input 
                type="number" 
                id="height" 
                v-model.number="height" 
                :placeholder="heightPlaceholder" 
                required 
              />
            </div>
            <div v-else>
              <select class="imperial" id="height" v-model.number="height" required>
                <option 
                  v-for="(heightOption, index) in predefinedImperialHeights" 
                  :key="index" 
                  :value="heightOption.value">
                  {{ heightOption.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Activity Level -->
        <div class="form-group">
          <label for="activity">Activity Level:</label>
          <select id="activity" v-model="activityLevel" required>
            <option value="" disabled>Select activity level</option>
            <option value="1.2">Sedentary (office job)</option>
            <option value="1.375">Light Exercise (1-2 days/week)</option>
            <option value="1.55">Moderate Exercise (3-5 days/week)</option>
            <option value="1.725">Heavy Exercise (6-7 days/week)</option>
            <option value="1.9">Athlete (2x per day)</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
          <button class="button" type="submit" @click="calculateTDEE">Calculate</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from "vue";
  import { useAppStore } from '@/stores/appStore';
  import gsap from "gsap";

  
  const store = useAppStore();
  const calc = ref<HTMLElement | null>(null);
  const unitSystem = ref<"metric" | "imperial">("metric");
  const gender = ref<string>("Male");
  const age = ref<number | null>(null);
  const weight = ref<number | null>(null);
  const height = ref<number | null>(null);
  const activityLevel = ref<string | null>("");
  const tdee = ref<number | null>(null);

  const weightPlaceholder = computed(() => 
    unitSystem.value === "metric" ? "Enter weight in kg" : "Enter weight in lbs"
  );
  const heightPlaceholder = computed(() => 
    unitSystem.value === "metric" ? "Enter height in cm" : "Enter height in ft/in"
  );

  const predefinedImperialHeights = [
    { label: "4ft 7in", value: 139.7 },
    { label: "4ft 8in", value: 142.24 },
    { label: "4ft 9in", value: 144.78 },
    { label: "4ft 10in", value: 147.32 },
    { label: "4ft 11in", value: 149.86 },
    { label: "5ft 0in", value: 152.4 },
    { label: "5ft 1in", value: 154.94 },
    { label: "5ft 2in", value: 157.48 },
    { label: "5ft 3in", value: 160.02 },
    { label: "5ft 4in", value: 162.56 },
    { label: "5ft 5in", value: 165.1 },
    { label: "5ft 6in", value: 167.64 },
    { label: "5ft 7in", value: 170.18 },
    { label: "5ft 8in", value: 172.72 },
    { label: "5ft 9in", value: 175.26 },
    { label: "5ft 10in", value: 177.8 },
    { label: "5ft 11in", value: 180.34 },
    { label: "6ft 0in", value: 182.88 },
    { label: "6ft 1in", value: 185.42 },
    { label: "6ft 2in", value: 187.96 },
    { label: "6ft 3in", value: 190.5 },
    { label: "6ft 4in", value: 193.04 },
    { label: "6ft 5in", value: 195.58 },
    { label: "6ft 6in", value: 198.12 },
    { label: "6ft 7in", value: 200.66 },
    { label: "6ft 8in", value: 203.2 },
    { label: "6ft 9in", value: 205.74 },
    { label: "6ft 10in", value: 208.28 },
    { label: "6ft 11in", value: 210.82 },
    { label: "7ft 0in", value: 213.36 },
  ];

  const switchTo = (system: "metric" | "imperial") => {
    unitSystem.value = system;
    height.value = null; // Reset height when switching systems
    weight.value = null;
  };

  const calculateTDEE = () => {
    if (age.value && weight.value && height.value && activityLevel.value) {
      const weightInKg = unitSystem.value === 'imperial' ? weight.value! * 0.453592 : weight.value!;
      const heightInCm = height.value!;
      const bmr =
        10 * weightInKg +
        6.25 * heightInCm -
        5 * age.value +
        (gender.value === 'Male' ? 5 : -161);
      tdee.value = Math.round(bmr * parseFloat(activityLevel.value));
    }

    // Pass data and show hidden div
    store.updateData({
      gender: gender.value,
      age: age.value,
      weight: weight.value,
      height: height.value,
      activityLevel: activityLevel.value,
      tdee: tdee.value,
    });

    store.toggleHiddenState(false);
  };

  onMounted(async() => {
    // animation code
    if (calc.value) {
      gsap.fromTo(
        calc.value.querySelectorAll("h1, div"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 0.7,
          ease: "power1.out" 
        }
      );
    }
  });
</script>

<style scoped>
.calc-container {
  height: 100%;
  display: flex;
  flex-direction: column; /* Stacks items vertically */
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: #f0f0f0;
  min-height: 20vh;
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff; /* High contrast */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.5px;
  position: relative;
  text-align: center;
}

.card {
  max-width: 400px; /* Ensures the card has a consistent width */
  width: 100%;
  padding: 1.5rem; /* Reduced padding */
  font-size: 1rem; /* Slightly smaller font size */ 
}

.unit-switch a {
  text-decoration: none;
  margin: 0 1rem; /* Reduced margin */
  color: #f0f0f0;
  cursor: pointer;
  font-weight: bold;
}

.unit-switch a.active {
  color: #C94079;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1 1 calc(50% - 1rem); /* Dynamic width, handles shrinking */
}

label {
  margin-bottom: 0.5rem;
  font-size: 1rem; /* Reduced label font size */
}

input, select {
  padding: 0.5rem; /* Reduced padding */
  font-size: 1rem; /* Reduced input font size */
  background-color: #2e2e2e;
  color: #f0f0f0;
  margin-bottom: 1rem; /* Reduced margin */
}

.imperial {
  padding-left: 3rem; /* Reduced padding */
  padding-right: 3rem;
  font-size: 1rem; /* Reduced input font size */
  text-align: left;
  margin-bottom: 1rem; /* Reduced margin */
}

.radio {
  display: flex;
  justify-content: space-around;
}

.radio div {
  display: flex;
  align-items: center;
}

.radio label {
  font-size: 1rem; /* Reduced label font size */
  margin-left: 0.5rem; /* Reduced margin */
}

.radio input {
  width: 1.2rem; /* Reduced input size */
  height: 1.2rem;
  color: #f0f0f0;
  accent-color: #C94079;
  outline: none;
  border: none;
}

.radio input:focus  {
  outline: none;
  box-shadow: none;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem
}

.button {
  width: 100%;
  padding: 0.5rem; /* Reduced padding */
  font-size: 1rem; /* Reduced font size */
  border-radius: 15px;
  margin-top: 1rem;
}



@media (max-width: 600px) {
  h1 {
    font-size: 2em;
  }

  .card {
    width: 40vh;
  }
}

@media (min-width: 600px) {
  h1 {
    font-size: 2rem;
  }
}
</style>