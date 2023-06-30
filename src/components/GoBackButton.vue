<template>
  <div class="go-back-container">
    <TheButton v-if="hasBack" @click="goBack"> Go Back </TheButton>
  </div>
</template>
<script setup>
/**
  Imports
 */
import TheButton from "./TheButton.vue";
import { useRouter } from "vue-router";

/**
  Router logic
 */
const router = useRouter();
const hasBack = Boolean(router.options.history.state.back);

const goBack = () => {
  router.back();
};
</script>
<style scoped lang="scss">
.go-back-container {
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
}
</style>
