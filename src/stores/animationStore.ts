// stores/animationStore.ts
import { defineStore } from "pinia";

export const useAnimationStore = defineStore("animation", {
  state: () => ({
    isSliding: false, // Whether the right div is sliding left
    isSlidingBack: false,
    isMovedBack: false,
    isFading: false, // Whether the left div is fading out
    isMoved: false, // Whether the left div is moved to the right
    isVisible: true,
    targetRoute: "", // The route to navigate to after the animation
  }),
  actions: {
    triggerAnimation(route: string) {
      this.isSliding = true;
      this.isFading = true;
      this.isVisible = false;
      this.targetRoute = route;
    },
    resetAnimation() {
      this.isSliding = false;
      this.isFading = false;
      this.isMoved = false;
      this.targetRoute = "";
    },
    completeMove() {
      this.isFading = false;
      this.isMoved = true;
    },
    makeVisible() {
      this.isVisible = true;
    }
  },
});
