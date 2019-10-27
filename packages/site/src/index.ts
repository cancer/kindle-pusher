import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app';
import { routes } from "./shared/routes";
import VueCompositionApi from '@vue/composition-api';
import Buefy from 'buefy'

Vue.use(VueRouter)
Vue.use(VueCompositionApi)
Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultContainerElement: '#root'
})

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  el: '#root',
  template: '<app />',
  components: { app },
  data: {},
  router,
});
