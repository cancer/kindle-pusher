import Vue from 'vue';
import app from './app';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi)


new Vue({
  el: '#root',
  template: '<app />',
  components: { app },
  data: {},
})
