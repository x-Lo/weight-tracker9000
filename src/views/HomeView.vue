<template>
  <div class="homepage-container">
    <!-- Left Section -->
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

    <!-- Right Section -->
    <div
      class="homepage-right"
      :class="{
        isSlidingLeft: animationStore.isSliding,
        isSlidingBack: animationStore.isSlidingBack,
      }"
    >
      <router-view name="right" />
    </div>
  </div>
</template>


<script lang="ts" defer>
import { useRouter, useRoute } from "vue-router";
import { useAnimationStore } from "@/stores/animationStore";
import { watch, onMounted } from "vue";

export default {
  name: "HomeView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const animationStore = useAnimationStore();

    // Watch for sliding animation state
    watch(
      () => animationStore.isSliding,
      (isSliding) => {
        if (isSliding) {
          // Start left section animations
          setTimeout(() => animationStore.completeMove(), 700);

          // Redirect after animations
          setTimeout(() => {
            router.push({ name: animationStore.targetRoute });
            animationStore.makeVisible();
          }, 700);
        }
      }
    );

    // Reset animations on returning to the home view
    watch(
      () => route.name,
      (newRoute) => {
        if (newRoute === "homeview" || newRoute === "login" || newRoute === "signup") {
          animationStore.resetAnimation();
        }
      },
      { immediate: true }
    );

    // Ensure reset on initial load if on home view
    onMounted(() => {
      if (route.name === "homeview" || route.name === "login" || route.name === "signup") {
        /* animationStore.isSliding = false;
        animationStore.isFading = false;
        animationStore.isMoved = false;
        animationStore.targetRoute = ""; */
        animationStore.resetAnimation();
      }
    });

    return {
      animationStore,
    };
  },
};
</script>

<style scoped>
/* Existing styles */
.homepage-container {
  display: flex;
  height: 100vh;
  width: 100%;
  /*background: linear-gradient(to bottom , #191919, #2c2c2c);*/
  background: linear-gradient(to bottom, 
    #191919 75%, /* Dark gray at the top */
    #39202A 100% /* Pinkish transition at the bottom */
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Keeps it steady on scroll */
}

.homepage-left,
.homepage-right {
  visibility: visible; /* Ensure visibility by default */
  opacity: 1; /* Full opacity by default */
  transform: none; /* Ensure no movement by default */
}

.homepage-left {
  flex: 0 0 65%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  transition: transform 0.7s ease-in-out, visibility 0.7s ease-in-out, opacity 0.7s ease-in-out;
}

.homepage-right {
  flex: 0 0 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
    flex: 0 0 80%;
  }

  .homepage-right {
    flex: 0 0 20%;
  }
}
</style>
