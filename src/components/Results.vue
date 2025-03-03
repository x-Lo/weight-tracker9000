<template>
  <div class="info-page" v-show="resultsData.hidden" ref="info">
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
  </div>

  <div class="results-page" v-show="!resultsData.hidden" ref="results">
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
            <div class="grid-item fatloss" @click="updatePlanType" id="Fat Loss">Fat Loss</div>
            <div class="grid-item maintenance" @click="updatePlanType" id="Maintenance">Maintenance</div>
            <div class="grid-item musclegain" @click="updatePlanType" id="Muscle Gain">Muscle Gain</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, watch } from "vue";
  import { useNavigation } from '@/composables/useNavigation';
  import { useAppStore } from '@/stores/appStore';
  import gsap from "gsap";

  const { navigate } = useNavigation();
  const store = useAppStore();
  const info = ref<HTMLElement | null>(null);
  const results = ref<HTMLElement | null>(null);
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

  onMounted(async() => {
    // animation code
    if (info.value) {
      gsap.fromTo(
        info.value.querySelectorAll("*"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 1,
          stagger: 0.1,
          ease: "power1.out" 
        }
      );
    }

    if (results.value) {
      gsap.fromTo(
        results.value.querySelectorAll("*"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 1,
          stagger: 0.1,
          ease: "power1.out" 
        }
      );
    }
  });

  watch(() => store.resultsData.hidden,(newHidden) => {
    const timeline = gsap.timeline();

    if (!newHidden) {
      // Animate info-page out to the left and results-page in from the right
      timeline
        .to(info.value, {
          x: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => {
            info.value!.style.display = "none"; // Ensure info-page is hidden
          },
        })
        .fromTo(
          results.value,
          { x: "100%", opacity: 0, display: "block" },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power1.inOut" }
        );
    } else {
      // Animate results-page out to the right and info-page in from the left
      timeline
        .to(results.value, {
          x: "100%",
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => {
            results.value!.style.display = "none"; // Ensure results-page is hidden
          },
        })
        .fromTo(
          info.value,
          { x: "-100%", opacity: 0, display: "block" },
          { x: "0%", opacity: 1, duration: 0.5, ease: "power1.inOut" }
        );
    }
  });


</script>

<style scoped>
.results-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #f0f0f0;
  padding: 2rem;
}

.info-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  gap: 2rem;
  max-width: 800px; /* Limits content width for readability */
}

.info-step {
  padding: 1rem;
}

.results-page h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.5px;
  text-align: center;
}

.results-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  padding: 1.5rem;
  padding-bottom: 1.9rem;
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
  outline-color: #C94079;
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

@media only screen and (max-width: 600px) {
  .results-page {
    align-items: center;
  }

  .info-page, .results-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .info-page, .results-grid {
    width: 100%;
    padding: 1rem;
    gap: 1rem;
  }

  .grid-item {
    max-width: 40vh;
  }
}

@media only screen and (min-width: 600px) and (max-width: 767px) {
  .results-page {
    align-items: center;
  }

  .info-page, .results-grid {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .info-page {
    height: auto;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  .grid-item {
    width: 100vh;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .results-page {
    align-items: center;
  }

  .results-grid {
    flex-direction: row;
    align-items: center;
  }

  .info-page {
    height: auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; 
    text-align: center;
    max-width: 800px; /* Limits content width for readability */
  }

  .info-step {
    padding: 1rem;
  }

  .grid-item {
    max-width: 30vh;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1279px) {
  .results-page {
    align-items: center;
  }

  .grid-item {
    max-width: 30vh;
  }

  .results-page h1 {
    font-size: 2rem;
  }

  .results-grid .grid-item {
    max-height: 61vh;
  }

  .info-page {
    height: auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
}
</style>
