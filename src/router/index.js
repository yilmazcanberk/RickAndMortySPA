import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: (route) => ({ page: Number(route.query.page) || 1 }),
  },
  {
    path: "/character/:id",
    name: "character",
    component: CharacterView,
  },
  {
    path: "/favourites",
    name: "favourites",
    component: () =>
      import(
        /* webpackChunkName: "favourites" */ "../views/FavouritesView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
