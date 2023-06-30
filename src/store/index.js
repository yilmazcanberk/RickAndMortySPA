import { createStore } from "vuex";

const baseURL = "https://rickandmortyapi.com/api/";

export default createStore({
  state: {
    characters: [],
    favourites: JSON.parse(localStorage.getItem("favourites")) || {},
  },
  getters: {
    isCharInFavourite: (state) => (charId) => {
      return !!state.favourites[charId];
    },
    favouriteCount: (state) => {
      return Object.keys(state.favourites).length;
    },
  },
  mutations: {
    ADD_CHARACTERS(
      state,
      { characters, page, pages, prev, next, species, name }
    ) {
      state.characters = {
        ...state.characters,
        [page + species + name]: {
          characters,
          pages: pages,
          prev: prev,
          next: next,
        },
      };
    },
    ADD_FAVOURITE(state, { newFavourite }) {
      state.favourites = {
        ...state.favourites,
        [newFavourite.id]: newFavourite,
      };
    },
    REMOVE_FAVOURITE(state, { id }) {
      delete state.favourites[id];
    },
    UPDATE_STORAGE(state) {
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
  },
  actions: {
    async fetchCharacters(context, { page, species, name }) {
      // If data is already fetched then skip
      if (context.state.characters[page + species + name]) return;
      try {
        let fetchURL = `${baseURL}character/?page=${page}`;

        // if there is species and its not 'none' string add species parameter
        if (species && species !== "none") fetchURL += `&species=${species}`;

        // if there is name add name parameter
        if (name) fetchURL += `&name=${name}`;

        const response = await fetch(fetchURL);
        const responseJSON = await response.json();

        // trigger mutaion with the response after fetching data
        context.commit({
          type: "ADD_CHARACTERS",
          characters: responseJSON.results,
          pages: responseJSON.info.pages,
          prev: responseJSON.info.prev,
          next: responseJSON.info.next,
          page,
          species: species !== null ? species.toLowerCase() : "",
          name: name !== null ? name.toLowerCase() : "",
        });
      } catch (error) {
        console.error(`Oops! Something went wrong: ${error.message}`);
      }
    },
    addToFavourites(context, newFavourite) {
      if (context.state.favourites[newFavourite]) return;

      context.commit({
        type: "ADD_FAVOURITE",
        newFavourite,
      });
      context.commit("UPDATE_STORAGE");
    },
    removeFromFavourites(context, { id }) {
      if (!context.state.favourites[id]) return;

      context.commit({
        type: "REMOVE_FAVOURITE",
        id: id,
      });
      context.commit("UPDATE_STORAGE");
    },
  },
  modules: {},
});
