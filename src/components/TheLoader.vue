<template>
  <div class="loader" v-if="isLoading">
    <img src="../assets/ring-resize.svg" alt="spinner" />
  </div>
</template>
<script setup>
/**
  Imports
 */
import { defineProps } from "vue";

/**
  Props
 */
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>
<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;

  img {
    height: 10rem;
    width: 10rem;
  }
}
</style>
