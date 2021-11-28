import { createWebHistory, createRouter } from "vue-router";
import Major from "@/views/Major.vue";
import Minor from "@/views/Minor.vue";

const routes = [
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