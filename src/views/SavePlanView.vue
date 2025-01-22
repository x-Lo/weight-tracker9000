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

/* Mobile styles */
@media (max-width: 600px) {
    .savePlanView-page {
        flex-direction: column;
    }

    .calendar, .savePlan {
        width: 100%; /* Ensure both sections are full-width */
        height: auto;
        padding: 1rem;
    }
}

@media (min-width: 600px) and (max-width: 767px) {
    .savePlanView-page {
        flex-direction: column;
        gap: 30em;
    }

}

/* Tablet styles */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .savePlanView-page {
    flex-direction: column; /* Stack left and right sections vertically */
  }

}

@media only screen and (min-width: 992px) and (max-width: 1279px) {
  .calendar{
    flex-grow: 1;
  }
}
</style>