import { createWebHistory, createRouter } from "vue-router";

import Layout from "@/layouts/Layout.vue";
import Home from "@/pages/Home.vue";
import Conversion from "@/pages/Conversion.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      layout: Layout,
    },
  },
  {
    path: "/conversion",
    component: Conversion,
    meta: {
      layout: Layout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
