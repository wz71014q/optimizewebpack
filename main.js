import Vue from 'vue';
import App from './src/views/App';
import router from './src/router'

const $vm = new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>'
});
Vue.use($vm);
