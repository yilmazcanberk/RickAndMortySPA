<template>
  <div class="char-page-container page-container">
    <TheLoader v-if="isLoading" :isLoading="isLoading" />
    <SpeciesCard
      v-else
      :id="id"
      :img="image"
      :name="name"
      :species="species"
      :status="status"
      imagePos="right"
    >
      <p>Last known location: {{ locationName }}</p>
      <p>First seen in: {{ firstEpisode }}</p>
    </SpeciesCard>

    <GoBackButton />
  </div>
</template>
<script setup>
/**
  Imports
 */
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoBackButton from "@/components/GoBackButton.vue";
import SpeciesCard from "@/components/SpeciesCard.vue";
import TheLoader from "@/components/TheLoader.vue";

/**
  Variables
 */
const image = ref(null);
const name = ref(null);
const species = ref(null);
const status = ref(null);
const locationName = ref("");
const firstEpisode = ref("");
const isLoading = ref(true);

/**
  Router
 */
const route = useRoute();
const id = Number(route.params.id);

/**
  View Logic
 */
const fetchURL = "https://rickandmortyapi.com/api/character/" + id;

onMounted(async () => {
  const response = await fetch(fetchURL);
  const selectedCharData = await response.json();
  // assign selected char data logic
  image.value = selectedCharData.image;
  name.value = selectedCharData.name;
  species.value = selectedCharData.species;
  status.value = selectedCharData.status;
  locationName.value = selectedCharData.location.name;

  // assign episode logic
  const episodeResponse = await fetch(selectedCharData.episode[0]);
  const episodeJSON = await episodeResponse.json();
  firstEpisode.value = episodeJSON.episode + " - " + episodeJSON.name;
  // hide loader
  isLoading.value = false;
});
</script>
<style lang="scss" scoped></style>
