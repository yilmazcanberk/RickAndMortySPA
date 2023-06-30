<template>
  <div v-if="totalPages" class="pagination">
    <span>Page {{ page }} of {{ totalPages }}</span>
    <router-link
      :to="{ path: '/', query: { page: page - 1 } }"
      :class="{ disabled: page === 1 }"
    >
      {{ "<< Prev" }}
    </router-link>
    <router-link
      :to="{ path: '/', query: { page: page + 1 } }"
      :class="{ disabled: page === totalPages }"
    >
      {{ "Next >>" }}
    </router-link>
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
  totalPages: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});
</script>
<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 3rem 1rem;
  gap: 10px;
  color: black;
  max-width: 80%;
  margin: 0 auto;

  a {
    text-decoration: none;
    color: black;
  }
  .disabled {
    color: gray;
    pointer-events: none;
  }
}
</style>
