<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  background: black;
  color: white;
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
  border: none;
  width: fit-content;
}
</style>
