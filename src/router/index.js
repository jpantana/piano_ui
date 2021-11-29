import { createWebHistory, createRouter } from "vue-router";
import Major from "@/views/Major.vue";
import Minor from "@/views/Minor.vue";

const routes = [
  {
    path: "/",
    redirect: '/major',
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
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'Not found',
  //   component: NotFound, // TODO: redirect to major insteadof making component to indicate bad route
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;