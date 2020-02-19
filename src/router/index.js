import Vue from "vue";
import VueRouter from "vue-router";
import home from "./modules/home/index.js";
import my from "./modules/my/index.js";

Vue.use(VueRouter);

const routes = [...home, ...my];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

import intercept from "./intercept.js";
intercept(router);

export default router;
