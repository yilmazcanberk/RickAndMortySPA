<template>
  <div class="favourites page-container">
    <div class="card-container" v-if="!!Object.keys(favourites).length">
      <SpeciesCard
        v-for="favourite in favourites"
        :key="favourite.id"
        :img="favourite.img"
        :name="favourite.name"
        :species="favourite.species"
        :status="favourite.status"
        :id="favourite.id"
      />
    </div>
    <div v-else class="no-cards">
      There are no cards added to the favourites yet!
    </div>
    <GoBackButton />
  </div>
</template>

<script setup>
/**
  Imports
 */
import { ref } from "vue";
import { useStore } from "vuex";
import GoBackButton from "@/components/GoBackButton.vue";
import SpeciesCard from "../components/SpeciesCard.vue";

/**
  Store
 */
const store = useStore();

/**
  Variables
 */
const favourites = ref(null);
favourites.value = store.state.favourites;
</script>

<style scoped lang="scss">
.card-container {
  justify-content: center;
  max-width: 80%;
  margin-inline: auto;
  margin-top: 3rem;
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
.no-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  letter-spacing: 0.025em;
  font-weight: 500;
}
</style>
