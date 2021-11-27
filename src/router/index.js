import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/Menu.vue";
import Major from "@/views/Major.vue";
import Minor from "@/views/Minor.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/menu",
    name: "Menu",
    component: About,
  },
  {
    path: "/major",
    name: "Major scale",
    component: Major,
  },
  {
    path: "/minor",
    name: "Minor scale",
    component: Minor,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;