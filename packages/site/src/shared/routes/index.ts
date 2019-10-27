import { RouteConfig } from "vue-router";
import home from "../../pages/home/index.vue";
import loginCallback from '../../pages/login/callback/index.vue';

export const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/login/callback',
    component: loginCallback,
  }
] as RouteConfig[];