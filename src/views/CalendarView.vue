<template>
    <div class="calendarview-page">
        <div class="calendar">
            <Calendar/>
        </div>
        <div class="dailyWeight">
            <DailyWeight/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Calendar from '@/components/Calendar.vue';
    import DailyWeight from '@/components/DailyWeight.vue';
</script>

<style scoped>
    .calendarview-page {
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

    .dailyWeight {
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
</style>