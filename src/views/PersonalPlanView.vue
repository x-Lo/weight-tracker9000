<template>
    <div class="personal-container">
        <h1>Your Personal Plan</h1>
        <div class="grid-container" ref="grid">
            <div class="grid-item rate" v-show="resultsData.typeOfPlan !== 'Maintenance'">
                <h2>Set a Rate of {{ resultsData.typeOfPlan }}:</h2>
                <div class="form-group">
                    <div class="rate-options-grid">
                        <div 
                            class="grid-item slow" 
                            :class="{ isSelected: selectedRate === 'slow' }" 
                            @click="pickRate('slow')">
                            Slow
                        </div>
                        <div 
                            class="grid-item moderate" 
                            :class="{ isSelected: selectedRate === 'moderate' }" 
                            @click="pickRate('moderate')">
                            Moderate
                        </div>
                        <div 
                            class="grid-item fast" 
                            :class="{ isSelected: selectedRate === 'fast' }" 
                            @click="pickRate('fast')">
                            Fast
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <h2>Set a Goal Weight:</h2>
                    <input
                        type="number"
                        class="input"
                        v-model="goalweight"
                        placeholder="Enter your goal weight (kg)"
                        @input="validateGoalWeight"
                        required
                    />
                    <p v-if="validationError" class="error">{{ validationError }}</p>
                </div>
                <button
                    class="button"
                    :disabled="!goalweight"
                    @click="calorieCalc">
                    CALCULATE
                </button>
            </div>
            <div class="grid-item maintenance" v-show="resultsData.typeOfPlan == 'Maintenance'">
                <div class="input-group">
                    <h2>Set a Duration for Your Maintenance Plan:</h2>
                    <input
                        type="number"
                        class="input"
                        v-model="maintenanceDays"
                        placeholder="Enter your desired duration (days)"
                        @input="validateMaintenanceDays"
                        required
                    />
                    <p v-if="validationError" class="error">{{ validationError }}</p>
                </div>
                <button
                    class="button"
                    :disabled="!maintenanceDays"
                    @click="calorieCalc">
                    CALCULATE
                </button>
            </div>
            <div class="grid-item-h calories"  ref="calories">
                <h2>Your {{ resultsData.typeOfPlan }} Calories:</h2>
                <div class="calorie-section">
                    <span class="calories-value">{{ resultsData.calories }}</span>
                    <span class="calories-label">calories per day</span>
                </div>
                <div class="calorie-section" style="border: none;">
                    <span class="calories-value">{{ resultsData.calories ? resultsData.calories * 7 : '-' }}</span>
                    <span class="calories-label">calories per week</span>
                </div>
            </div>
            <div class="grid-item-h macros"  ref="macros">
                <h2>Your Macronutrients:</h2>
                <div class="macro-section">
                    <span class="macro-value">{{ resultsData.protein }}g</span>
                    <span class="macro-label">protein</span>
                </div>
                <div class="macro-section">
                    <span class="macro-value">{{ resultsData.fats }}g</span>
                    <span class="macro-label">fats</span>
                </div>
                <div class="macro-section" style="border: none;">
                    <span class="macro-value">{{ resultsData.carbs }}g</span>
                    <span class="macro-label" style="">carbs</span>
                </div>
            </div>
            <div class="grid-item-h calendar"   ref="calendar">
                <div class="calendar-section">
                    <h2>Your  {{ resultsData.typeOfPlan }} Phase Will Last: </h2>
                    <span class="calendar-value">{{resultsData.phaseDuration}}</span>
                    <span class="calendar-label" style="">Days</span>
                </div>
                <button class="button" @click="calendarCalc">CHECK CALENDAR</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/appStore';
import { computed, ref } from 'vue';
import { useNavigation } from '@/composables/useNavigation';
import gsap from 'gsap';

const store = useAppStore();
const { navigate } = useNavigation();
const selectedRate = ref<string | null>(null);
const goalweight = ref<number | null>(null);
const maintenanceDays = ref<number | null>(null);
const validationError = ref(""); // Store validation error messages.
const calories = ref<HTMLElement | null>(null);
const macros = ref<HTMLElement | null>(null);
const calendar = ref<HTMLElement | null>(null);
const grid = ref<HTMLElement | null>(null);

const resultsData = computed(() => store.resultsData);

const pickRate = (rate: string) => {
    selectedRate.value = rate;
    store.updateResultsProperty('rate', rate);
};

const validateGoalWeight = () => {
    if (goalweight.value === null || goalweight.value <= 0) {
        validationError.value = "Goal weight must be a positive number.";
        return;
    }

    if (store.resultsData.typeOfPlan === "Fat Loss" && goalweight.value >= store.resultsData.weight) {
        validationError.value = "For Fat Loss, the goal weight must be less than your current weight.";
        return;
    }

    if (store.resultsData.typeOfPlan === "Muscle Gain" && goalweight.value <= store.resultsData.weight) {
        validationError.value = "For Muscle Gain, the goal weight must be more than your current weight.";
        return;
    }

    validationError.value = ""; // Clear the error if validation passes.
};

const validateMaintenanceDays = () => {
    if (maintenanceDays.value === null || maintenanceDays.value <= 0) {
        validationError.value = "Plan duration must be a positive number.";
        return;
    }
}

const calorieCalc = () => {
    // Ensure required fields exist
    const { typeOfPlan, rate } = store.resultsData;

    if (!typeOfPlan || (typeOfPlan !== 'Maintenance' && !rate)) {
        console.error('typeOfPlan or rate is missing in resultsData');
        return;
    }

    if (typeOfPlan === 'Maintenance') {
        // Handle Maintenance case
        if (!store.resultsData.tdee || !store.resultsData.weight) {
            console.error('Missing TDEE or weight data for Maintenance plan');
            return;
        }
        store.updateResultsProperty('phaseDuration', maintenanceDays.value);
        store.updateResultsProperty('calories', store.resultsData.tdee);
        store.updateResultsProperty('goalweight', store.resultsData.weight);
        store.updateResultsProperty('rate', '-');
        console.log('Maintenance plan data updated.');

        // Update macros calculations
        const protein_gr = Math.round(store.resultsData.weight * 1.5);
        const protein_cal = Math.round(protein_gr * 4);

        const fats_cal = Math.round(store.resultsData.calories * 0.25);
        const fats_gr = Math.round(fats_cal / 9);

        const carbs_cal = Math.round(store.resultsData.calories - (protein_cal + fats_cal));
        const carbs_gr = Math.round(carbs_cal / 4);

        store.updateResultsProperty('protein', protein_gr);
        store.updateResultsProperty('fats', fats_gr);
        store.updateResultsProperty('carbs', carbs_gr);

        if (grid.value) {
            const hiddenItems = grid.value.querySelectorAll('.grid-item-h');

            const tl = gsap.timeline();
            hiddenItems.forEach((item) => {
                tl.fromTo(
                    item,
                    { x: '-100vw', opacity: 0, visibility: 'hidden' },
                    { x: '0', opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power1.out' }
                );
            });
        }

        return; // Skip further calculations
    }

    // Base calorie adjustments
    const adjustments: Record<string, Record<string, number>> = {
        'Fat Loss': {
            slow: -250,
            moderate: -500,
            fast: -1000,
        },
        'Muscle Gain': {
            slow: +250,
            moderate: +500,
            fast: +1000,
        },
    };

    // Update TDEE based on the typeOfPlan and rate
    if (adjustments[typeOfPlan] && adjustments[typeOfPlan][rate]) {
        const adjustmentValue = adjustments[typeOfPlan][rate];
        const updatedTdee = store.resultsData.tdee + adjustmentValue;
        store.updateResultsProperty('calories', updatedTdee);
    } else {
        console.error(`Invalid typeOfPlan or rate: typeOfPlan=${typeOfPlan}, rate=${rate}`);
        return;
    }

    // Update macros calculations
    const protein_gr = Math.round(store.resultsData.weight * 1.5);
    const protein_cal = Math.round(protein_gr * 4);

    const fats_cal = Math.round(store.resultsData.calories * 0.25);
    const fats_gr = Math.round(fats_cal / 9);

    const carbs_cal = Math.round(store.resultsData.calories - (protein_cal + fats_cal));
    const carbs_gr = Math.round(carbs_cal / 4);

    store.updateResultsProperty('protein', protein_gr);
    store.updateResultsProperty('fats', fats_gr);
    store.updateResultsProperty('carbs', carbs_gr);

    // Calculate the phase duration
    const adjustmentRate = adjustments[typeOfPlan][rate];
    const WEIGHT_CHANGE_PER_CALORIE = 7700;
    const weightDifference = (goalweight.value as number) - store.resultsData.weight;
    const totalCaloriesNeeded = weightDifference * WEIGHT_CHANGE_PER_CALORIE;
    const duration = Math.ceil(Math.abs(totalCaloriesNeeded / adjustmentRate));

    store.updateResultsProperty('phaseDuration', duration);

    store.updateResultsProperty('goalweight', goalweight)
    

    if (grid.value) {
        const hiddenItems = grid.value.querySelectorAll('.grid-item-h');

        const tl = gsap.timeline();
        hiddenItems.forEach((item) => {
            tl.fromTo(
                item,
                { x: '-100vw', opacity: 0, visibility: 'hidden' },
                { x: '0', opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power1.out' }
            );
        });
    }
};

const calendarCalc = () => {
    const phaseDuration = store.resultsData.phaseDuration;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + phaseDuration);

    const attributes = [
        {
            dates: startDate,
            popover: {
                label: 'Daily Weight Measurement: ' + store.resultsData.weight,
            },
            dot: {
                color: 'pink',
            },
        },
        {
            highlight: {
                start: {
                    fillMode: 'outline',
                    style: { backgroundColor: '#2c2c2c' },
                    contentStyle: { color: '#f0f0f0' },
                },
                base: {
                    fillMode: 'light',
                    style: { backgroundColor: '#f0f0f0' },
                },
                end: {
                    fillMode: 'outline',
                    style: { backgroundColor: '#2c2c2c' },
                    contentStyle: { color: '#f0f0f0' },
                },
            },
            dates: { start: startDate, end: endDate },
        },
    ];

    store.setCalendarAttributes(attributes);
    store.updateResultsProperty('startDate', startDate);
    store.updateResultsProperty('streak', 0);
    console.log('Calendar attributes updated:', attributes);
    navigate('saveplan');
};
</script>


<style scoped>
.personal-container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
}

.grid-container {
    width: 100%;
    max-height: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.rate-options-grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.rate-options-grid .grid-item{
    width: 40vh;
    background: none;
    border: none;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    text-align: center;
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 1.1em;
    color: #f0f0f0;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.rate-options-grid .grid-item:hover {
    outline-color: #C94079; /* Solid color for active state */
    box-shadow: 0 2px 0 rgba(201, 64, 121, 0.8);
}

.rate-options-grid .grid-item.isSelected {
    outline-color: #C94079; /* Solid color for active state */
    box-shadow: 0 2px 0 rgba(201, 64, 121, 0.8);
}

.grid-item {
  width: 50vh;
  background: rgba(39, 39, 39, 0.1);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
  color: #f0f0f0;
  margin-bottom: 1rem;
}

.grid-item-h {
    width: 50vh;
    background: rgba(39, 39, 39, 0.1);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    font-family: 'Roboto', Arial, sans-serif;
    color: #f0f0f0;
    visibility: hidden;
}

.maintenance {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.maintenance .input-group{
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: left;
}

.input-group{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;   
    width: 40vh;
    gap: 1rem;
}

.button {
    width: 40vh;
    border-radius: 15px;
}

.calorie-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 2rem;
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

h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff; /* High contrast */
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.5px;
  position: relative;
  text-align: center;
}

h2 {
  font-size: 1.2rem;
  color: #f0f0f0;
}

.macro-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.macro-value {
  font-size: 2rem;
  font-weight: bold;
}

.macro-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.calendar-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    flex-grow: 1;
}

.calendar-value {
  font-size: 4rem;
  font-weight: bold;
  
}

.calendar-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

a {
  cursor: pointer;
  color: #C94079;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .grid-container {
    flex-direction: column; /* Stack sections on top of each other */
    align-items: center;
  }
  
  .grid-item {
    width: 40vh;
  }

  .grid-item-h {
    width: 40vh;
  }

  .rate-options-grid .grid-item {
    width: 30vh;
  }

  h1 {
    font-size: 2em;
  }

  .input-group {
    width: 30vh;
    gap: 0.5rem;
  }

  .button {
    width: 30vh;
    margin-top: 1rem;
  }
}

@media (min-width: 600px) {  
    .personal-container {
        padding: 0.5rem;
    }

    .grid-container {
        gap: 1rem;
    }

    .grid-item,
    .grid-item-h {
        width: 45vh; /* Reduce the width slightly for better fit */
        padding: 0.8rem; /* Adjust padding */
    }

    .rate-options-grid .grid-item {
        width: 35vh; /* Make individual rate options smaller */
    }

    .input-group {
        gap: 0.8rem; /* Slightly reduce spacing between input and label */
        margin-bottom: 0.5rem;
    }

    .macro-section,
    .calorie-section,
    .calendar-section {
        font-size: 0.9em; /* Reduce font size slightly for better scaling */
    }

    .calories-value,
    .macro-value {
        font-size: 1.5em; /* Adjust larger text sizes for smaller widths */
    }
}
</style>