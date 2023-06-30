<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

button {
  cursor: pointer;
}

.page-container {
  max-width: 80%;
  margin-inline: auto;
  margin-block: 3rem;
}
</style>
