<template>
    <div class="personal-container">
        <h1>Your Personal Plan</h1>
        <div class="grid-container">
            <div class="grid-item rate">
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
                        required
                    />
                </div>
                <button
                    class="button"
                    :disabled="!goalweight"
                    @click="calorieCalc">
                    CALCULATE
                </button>
            </div>
            <div class="grid-item-h calories" :class="{ visible: isCalculated }">
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
            <div class="grid-item-h macros" :class="{ visible: isCalculated }">
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
            <div class="grid-item-h calendar"  :class="{ visible: isCalculated }">
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

    const store = useAppStore();
    const { navigate } = useNavigation();
    const selectedRate = ref<string | null>(null);
    const goalweight =  ref<number | null>(null);
    const isCalculated = ref(false);

    const resultsData = computed(() => store.resultsData);

    const pickRate = (rate: string) => {
        selectedRate.value = rate; // Update the selected rate
        store.updateResultsProperty('rate', rate); // Update the Pinia store
    };

    const calorieCalc = () => {
            // Ensure required fields exist
            const { typeOfPlan, rate } = store.resultsData;

            if (!typeOfPlan || !rate) {
                console.error('typeOfPlan or rate is missing in resultsData');
                return;
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
            }

            // Update the goalweight variable
            store.updateResultsProperty('goalweight', goalweight);

            // Update the macros card
            const protein_gr = Math.round(store.resultsData.weight * 1.5);
            const protein_cal = Math.round(protein_gr * 4);

            const fats_cal = Math.round(store.resultsData.calories * 0.25);
            const fats_gr = Math.round((store.resultsData.calories * 0.25) / 9);

            const carbs_cal = Math.round(store.resultsData.calories - (protein_cal + fats_cal));
            const carbs_gr = Math.round((carbs_cal / 4));

            store.updateResultsProperty('protein', protein_gr);
            store.updateResultsProperty('fats', fats_gr);
            store.updateResultsProperty('carbs', carbs_gr);

            // Calculate the duration of the phase
            const adjustmentRate = adjustments[typeOfPlan][rate];
            const WEIGHT_CHANGE_PER_CALORIE = 7700;
            const weightDifference = (goalweight.value as number) - store.resultsData.weight;
            const totalCaloriesNeeded = weightDifference * WEIGHT_CHANGE_PER_CALORIE;
            const duration = Math.ceil(Math.abs(totalCaloriesNeeded / adjustmentRate));

            store.updateResultsProperty('phaseDuration', duration);

            isCalculated.value = true;
    };

    const calendarCalc = () => {
            const phaseDuration = store.resultsData.phaseDuration;
            const startDate = new Date(); // Current date
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + phaseDuration); // Calculate end date

            // New attributes for VCalendar highlighting the phase duration
            const attributes = [
            // Attribute for the first day with a popover
            {
                dates: startDate, // Highlight only the first day
                popover: {
                    label: 'Daily Weight Measurement: ' + store.resultsData.weight,
                },
                dot: {
                    color: 'pink',
                }
            },
            // Attribute for the entire phase duration
            {
                highlight: {
                    start: { 
                        fillMode: 'outline', 
                        style: {
                            backgroundColor: '#2c2c2c', // blue
                        },
                        contentStyle: {
                            color: '#f0f0f0', // text color
                        },
                    },
                    base: { 
                        fillMode: 'light',
                        style: {
                            backgroundColor: '#f0f0f0', // background color
                        },
                    },
                    end: {
                        fillMode: 'outline',
                        style: {
                            backgroundColor: '#2c2c2c', // blue
                        },
                        contentStyle: {
                            color: '#f0f0f0', // text color
                        },
                    },
                },
                dates: { start: startDate, end: endDate }, // Apply styles to the full duration
            },];

            // Update attributes in Pinia store
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
    transform: translateX(-100%); /* Start off-screen to the left */
    transition: all 0.7s ease-in-out;
}

.grid-item-h.calories {
    transform: translateX(-100%); /* Start off-screen to the left */
    transition: transform 0.15s ease-in-out, visibility 0.15s ease-in-out, opacity 0.15s ease-in-out;
}

.grid-item-h.macros {
    transform: translateX(-200%); /* Start off-screen to the left */
    transition: transform 0.35s ease-in-out, visibility 0.35s ease-in-out, opacity 0.35s ease-in-out;
}

.grid-item-h.calendar {
    transform: translateX(-300%); /* Start off-screen to the left */
    transition: transform 0.7s ease-in-out, visibility 0.7s ease-in-out, opacity 0.7s ease-in-out;
}

/* When visible, grid items "spread out" */
.grid-item-h.visible {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
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
</style>