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
/* Container styles */
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 3rem;
  background: transparent;
  transition: transform 0.7s ease-in-out;
}

/* Transition Effects for Routes */
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

/* Extra small devices (phones, 600px and down) */
@media (max-width: 600px) {
  .homepage-container {
    flex-direction: column;
    height: 93%;
    gap: 3rem;
  }

  .homepage-left, .homepage-right {
    width: 100%; /* Ensure both sections are full-width */
    max-height: 65%;
    padding: 1rem;
  }

  .homepage-right {
    height: auto;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media (min-width: 600px) and (max-width: 767px) {
  .homepage-container {
    flex-shrink: 1;
    height: 90%;
  }

  .homepage-left, .homepage-right {
    flex: 1 0 50%;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .homepage-container {
    flex-direction: column;
  }

  .homepage-left {
    max-height: 50%;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1279px) {
  .homepage-container {
    flex-direction: row;
  }

  .homepage-left {
    max-height: 100%;
  }
}
</style>
