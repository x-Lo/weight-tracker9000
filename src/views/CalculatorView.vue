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
        min-height: 50vh;
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
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        background: transparent;
        transition: transform 0.7s ease-in-out;
    }

</style>