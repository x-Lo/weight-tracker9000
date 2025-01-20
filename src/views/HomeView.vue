<template>
  <div class="homepage-container">
    <!-- Left Section -->
    <transition>
      <div class="homepage-left">
        <router-view name="left" />
      </div>
    </transition>

    <!-- Right Section -->
    <div class="homepage-right">
      <router-view v-slot="{ Component }" name="right">
        <transition name="route" mode="out-in">
          <component  :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>


<script lang="ts" defer setup>

</script>

<style scoped>
/* Existing styles */
.homepage-container {
  display: flex;
  flex-direction: row;
  height: 90%;
  width: 100%;
}


.homepage-left {
  flex: 1 0 65%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  background: transparent;
  transition: transform 0.7s ease-in-out;
}

.homepage-right {
  flex: 1 0 35%;
  height: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 3rem;
  background: transparent;
  transition: transform 0.7s ease-in-out;
}

/* route transitions  */
.route-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.route-enter-active {
  transition: all 0.7s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.route-leave-active {
  transition: all 0.7s ease-in;
}

@media (max-width: 768px) {
  .homepage-container {
    flex-direction: column; /* Stack sections on top of each other */
  }
  
  .homepage-left,
  .homepage-right {
    width: 100%; /* Full width for smaller screens */
  }

  .homepage-left {
    flex: 0 0 100%;
  }

  .homepage-right {
    flex: 0 0 20%;
  }
}

@media (max-width: 480px) {
  .homepage-container {
    flex-direction: column; /* Stack sections on top of each other */
  }
  
  .homepage-left,
  .homepage-right {
    width: 100%; /* Full width for smaller screens */
  }

  .homepage-left {
    flex: 0 0 100%;
  }

  .homepage-right {
    flex: 0 0 100%;
  }
}
</style>
