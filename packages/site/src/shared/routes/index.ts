import { RouteConfig } from "vue-router";
import home from "../../home.vue";
import login from "../../login.vue";

export const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/login',
    component: login,
  }
] as RouteConfig[];