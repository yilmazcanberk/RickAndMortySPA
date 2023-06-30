<template>
  <div class="home">
    <FilterSection @setSpecies="filterClicked" @setSearch="searchClicked" />
    <TheLoader v-if="isLoading" :isLoading="isLoading" />
    <!-- If not loading, show main data -->
    <div v-else>
      <!-- If char data is available, show card -->
      <div v-if="charData">
        <div class="card-container">
          <SpeciesCard
            v-for="char in charData"
            :key="char.id"
            :img="char.image"
            :name="char.name"
            :species="char.species"
            :status="char.status"
            :id="char.id"
          />
        </div>
        <ThePagination :totalPages="totalPages" :page="page" />
      </div>
      <!-- If char data is not available, show warning text -->
      <div v-else class="no-characters-text">
        We couldn't find any characters according to your search. Please try
        again
      </div>
    </div>
  </div>
</template>

<script setup>
/**
  Imports
 */
import { onMounted, ref, defineProps, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import FilterSection from "../components/FilterSection.vue";
import SpeciesCard from "../components/SpeciesCard.vue";
import TheLoader from "@/components/TheLoader.vue";
import ThePagination from "@/components/ThePagination.vue";

/**
  Initiate Store
 */

const store = useStore();

/**
  Props
 */
const props = defineProps(["page"]);

/**
  Router
 */
const route = useRoute();
const router = useRouter();

/**
  Variables
 */
const charData = ref({});
const charInfo = ref({});
const totalPages = ref(null);
const isLoading = ref(true);
const activeSpecies = ref(null);
const searchedName = ref(null);

/**
  View Logic
 */
const getCharacters = async (pageOne = false) => {
  // show loader after page change
  isLoading.value = true;

  let page = pageOne ? 1 : props.page;

  // trigger to get current pages characters
  await store.dispatch("fetchCharacters", {
    page,
    species: activeSpecies.value,
    name: searchedName.value,
  });
  // change values to lowercase because fetchCharacters function changes letters to lowercase when adding to the characters in the store
  let activeSpeciesLowercase = changeToLowerCaseOrEmptyStr(activeSpecies);
  let searchedNameLowercase = changeToLowerCaseOrEmptyStr(searchedName);

  // get data for the active filter
  let activeList =
    store.state.characters[
      page + activeSpeciesLowercase + searchedNameLowercase
    ];

  charData.value = activeList?.characters;
  charInfo.value.prev = activeList?.prev;
  charInfo.value.next = activeList?.next;
  totalPages.value = activeList?.pages;
  // hide loader
  isLoading.value = false;
};

const filterClicked = async (activeSpec) => {
  activeSpecies.value = activeSpec;
  // getCharacters triggered with true to start from the first page
  getCharacters(true);
  // remove page parameter
  router.replace({ query: null });
};
const searchClicked = async (searchVal) => {
  searchedName.value = searchVal;
  // getCharacters triggered with true to start from the first page
  getCharacters(true);
  // remove page parameter
  router.replace({ query: null });
};

// Returns lowercase ref value or empty string
const changeToLowerCaseOrEmptyStr = (ref) => {
  return ref.value ? ref.value.toLowerCase() : "";
};

/**
 * Initiate main function
 */
onMounted(async () => {
  getCharacters();
});

/**
 * Watcher
 */

watch(
  () => route.query.page,
  () => {
    getCharacters();
  }
);
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80%;
  margin-inline: auto;
  margin-top: 3rem;
  gap: 3rem;
}
.no-characters-text {
  margin-top: 48px;
  max-width: 80%;
  margin-inline: auto;
  text-align: center;
}
</style>
