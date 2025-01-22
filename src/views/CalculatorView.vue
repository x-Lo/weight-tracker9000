<template>
    <div class="calculator-page">
        <div class="calculator">
            <Calculator/>
        </div>
        <div class="results">
            <Results/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Calculator from '@/components/Calculator.vue';
    import Results from '@/components/Results.vue';
</script>

<style scoped>
.calculator-page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.calculator {
    flex: 1 0 35%;
    height: 100%;
    display: flex;
    min-height: 30vh;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    gap: 3rem;
        
    background: transparent;
    transition: transform 0.7s ease-in-out;
}

.results {
    flex: 1 0 65%;
    height: 100%;
    min-height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    background: transparent;
    transition: transform 0.7s ease-in-out;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .calculator-page {
    flex-direction: column-reverse;
    justify-content: flex-start;
    height: auto;
  }
  
  .calculator,
  .results {
    width: 100%; 
    padding: 1rem; 
    gap: 0.5rem; 
    flex: 1 0 auto;
    height: auto;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 767px) {
  .calculator-page {
    flex-direction: column-reverse;
    justify-content: flex-start;
    height: auto;
    width: 100%;
  }
  
  .calculator,
  .results {
    width: 100%; 
    padding: 1rem;
    gap: 0.5rem;
    width: 100%;
    height: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .calculator-page {
    flex-direction: column-reverse;
  }

  .calculator,
  .results {
    flex-shrink: 1;
  }
}

@media only screen and (min-width: 992px) and (max-width: 1279px) {
  .calculator,
  .results {
    height: 100%;
  }
}
</style>