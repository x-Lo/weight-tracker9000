<template>
  <div class="homepage-container">
    <!-- Left Section -->
    <transition>
      <div
      class="homepage-left"
      :class="{
        isFadingOut: animationStore.isFading,
        isMovedRight: animationStore.isMoved,
        isMovedBack: animationStore.isMovedBack,
        isVisible: animationStore.isVisible,
      }"
    >
      <router-view name="left" />
    </div>
    </transition>

    <!-- Right Section -->
    <transition>
      <div
      class="homepage-right"
      :class="{
        isSlidingLeft: animationStore.isSliding,
        isSlidingBack: animationStore.isSlidingBack,
      }"
    >
      <router-view name="right" />
    </div>
    </transition>
  </div>
</template>


<script lang="ts" defer setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useAnimationStore } from "@/stores/animationStore";

const animationStore = useAnimationStore();

onMounted(() => {
  
});

</script>

<style scoped>
/* Existing styles */
.homepage-container {
  display: flex;
  flex-direction: row;
  height: 90%;
  width: 100%;
}

.homepage-left,
.homepage-right {
  opacity: 1; /* Default visibility */
  transform: none; /* Default positioning */
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
  padding: 1rem;
  background: transparent;
  transition: transform 0.7s ease-in-out;
}

.homepage-left.isMovedRight {
  transform: translateX(54%);
  opacity: 0;
}

.homepage-left.isVisible {
  opacity: 1;
}

.homepage-left.isFadingOut {
  opacity: 0;
}

.homepage-right.isSlidingLeft {
  transform: translateX(-185.5%);
}

.homepage-right.isSlidingBack {
  transform: translateX(60%);
}

.homepage-left.isMovedBack {
  transform: translateX(-100%);
  opacity: 0;
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
