import { RouteConfig } from "vue-router";
import home from "../../pages/home/index.vue";
import loginCallback from '../../pages/login/callback/index.vue';
import settings from '../../pages/settings/index.vue';
import books from '../../pages/books/index.vue';
import debug from '../../pages/debug/index.vue';

export const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/login/callback',
    component: loginCallback,
  },
  {
    path: '/settings',
    component: settings,
  },
  {
    path: '/books',
    component: books,
  },
  {
    path: '/debug',
    component: debug,
  }
] as RouteConfig[];