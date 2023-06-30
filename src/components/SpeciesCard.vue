<template>
  <div class="card-inner-container" :class="{ charPage: imagePos === 'right' }">
    <img :src="img" :alt="`${name}-image`" @click="routeToCharPage" />
    <div class="main-section">
      <p class="name">{{ name }}</p>
      <p>{{ species }} - {{ status }}</p>
      <slot></slot>
      <TheButton v-if="inFavourite" @click="removeFavourite">
        Remove from Favourites
      </TheButton>

      <TheButton v-else @click="addFavourite"> Add To Favourites </TheButton>
    </div>
  </div>
</template>

<script setup>
/**
  Imports
 */
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import TheButton from "./TheButton.vue";

/**
  Props
 */
const props = defineProps({
  img: {
    type: String,
  },
  name: {
    type: String,
  },
  species: {
    type: String,
  },
  status: {
    type: String,
  },
  id: {
    type: Number,
    required: true,
  },
  imagePos: {
    type: String,
    default: "top",
    validator(value) {
      // The value must match one of these strings
      return ["top", "right"].includes(value);
    },
  },
  locationName: {
    type: String,
  },
  firstEpisode: {
    type: String,
  },
});

/**
  Store
 */
const store = useStore();

/**
  Router
 */
const router = useRouter();

/**
 * Component logic
 */

const inFavourite = computed(() => {
  return store.state.favourites[props.id];
});

const addFavourite = () => {
  store.dispatch("addToFavourites", {
    id: props.id,
    name: props.name,
    species: props.species,
    img: props.img,
    status: props.status,
  });
};
const removeFavourite = () => {
  store.dispatch("removeFromFavourites", {
    id: props.id,
  });
};

const routeToCharPage = () => {
  router.push({ name: "character", params: { id: props.id } });
};
</script>

<style lang="scss" scoped>
.card-inner-container,
.main-section {
  color: black;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .name {
    font-weight: 700;
  }
}

img {
  min-width: 300px;
  min-height: 300px;
  cursor: pointer;
}

.charPage {
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(228, 228, 228);
  padding-left: 1rem;
  img {
    cursor: default;
  }
  .main-section {
    gap: 20px;
    .name {
      font-size: 2rem;
    }
  }
}
</style>
