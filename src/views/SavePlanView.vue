<template>
    <div class="savePlanView-page">
        <div class="calendar">
            <Calendar/>
        </div>
        <div class="savePlan">
            <SavePlan/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Calendar from '@/components/Calendar.vue';
    import SavePlan from '@/components/SavePlan.vue';
</script>

<style scoped>
    .savePlanView-page {
        display: flex;
        flex-direction: row;
        height: 90%;
        width: 100%;
    }

    .calendar {
        flex: 1 0 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
        background: transparent;
        transition: transform 0.7s ease-in-out;
    }

    .savePlan {
        flex: 1 0 35%;
        height: 100%;
        min-height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        text-align: center;
        gap: 3rem;
        padding: 1rem;
        background: transparent;
        transition: transform 0.7s ease-in-out;
    }

@media (max-width: 480px) {
    .savePlanView-page {
        flex-direction: column; /* Stack sections on top of each other */
    }   
  
    .calendar,
    .savePlan {
        width: 100%; /* Full width for smaller screens */
        flex: 0 0 100%;
    }
}
</style>