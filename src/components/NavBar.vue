<template>
  <nav>
    <router-link to="/">Characters</router-link>
    <router-link to="/favourites">Favourites</router-link>
    <TheFavourites />
  </nav>
</template>

<script setup>
/**
  Imports
 */
import TheFavourites from "./TheFavourites.vue";
</script>

<style lang="scss" scoped>
nav {
  background-color: #202327;
  padding: 1rem 3rem;
  position: sticky;
  top: 0;
  display: flex;
  z-index: 9;

  a {
    font-weight: bold;
    text-decoration: none;
    color: hsl(210, 7%, 56%);
    margin-right: 1rem;

    &:hover {
      color: hsl(210, 7%, 80%);
    }

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
