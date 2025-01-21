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

@media (max-width: 480px) {
  .calculator-page {
    flex-direction: column-reverse; /* Stack sections with results on top */
    justify-content: flex-start;
    height: auto;
  }
  
  .calculator,
  .results {
    width: 100%; /* Ensure both sections are full-width */
    padding: 1rem; /* Provide internal padding for better spacing */
    gap: 0.5rem; /* Reduce spacing for smaller devices */
    flex: 1 0 auto; /* Adjust flex to auto for better stacking */
    height: auto;
  }
}
</style>