<template>
  <router-link to="/favourites" class="count">
    <img src="../assets/heart-icon.svg" alt="heart-icon" />
    {{ favCount }}
  </router-link>
</template>
<script setup>
/**
  Imports
 */
import { computed } from "vue";
import { useStore } from "vuex";
/**
  Initialize store
 */
const store = useStore();

/**
  Dynamic favourite count
 */
let favCount = computed(() => store.getters.favouriteCount);
</script>

<style scoped lang="scss">
.count {
  color: white;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  img {
    height: 24px;
    width: 24px;
  }
}
</style>
