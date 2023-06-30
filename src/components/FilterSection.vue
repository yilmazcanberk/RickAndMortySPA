<template>
  <div class="container">
    <div class="btn-container">
      <button
        :class="{ active: activeSpecies === 'none' }"
        @click="setActiveSpecies('none')"
      >
        All
      </button>
      <button
        v-for="species in speciesArray"
        :key="species"
        :class="{ active: activeSpecies === species }"
        @click="setActiveSpecies(species)"
      >
        {{ species }}
      </button>
    </div>
    <div class="search-container">
      <label for="search"></label>
      <input
        id="search"
        type="text"
        v-model.trim="searchValue"
        placeholder="Search by name..."
        @keydown.enter="searchClicked"
      />
      <button @click="searchClicked">Search</button>
    </div>
  </div>
</template>

<script setup>
/**
  Imports
 */
import { ref, defineEmits } from "vue";

/**
  Emit
 */
const emit = defineEmits(["setSearch", "setSpecies"]);

/**
  Variables
 */
let activeSpecies = ref("none");
const speciesArray = ["Human", "Animal", "Alien"];

/**
  Component logic
 */
const setActiveSpecies = (activeItem) => {
  activeSpecies.value = activeItem;
  emit("setSpecies", activeSpecies.value);
};

const searchValue = ref("");

const searchClicked = () => {
  emit("setSearch", searchValue.value);
};
</script>

<style lang="scss" scoped>
.container {
  background: #f2f2f2;
  padding: 1rem 3rem;
  display: flex;
  gap: 50px;
}

.btn-container {
  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid black;
    font-size: 0.8rem;
    // letter-spacing: 0.01em;
    cursor: pointer;

    &:first-child {
      border-top-left-radius: 0.2rem;
      border-bottom-left-radius: 0.2rem;
    }

    &:last-child {
      border-top-right-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
    }
  }

  button:not(.active) {
    background: transparent;
  }

  button.active {
    background: black;
    color: white;
  }
}
.search-container {
  border: 1px solid black;
  input {
    color: black;
    height: 1.5rem;
  }
  button {
    color: black;
    height: 1.5rem;
    padding: 0rem 0.5rem;
    font-weight: 500;
  }
}
</style>
