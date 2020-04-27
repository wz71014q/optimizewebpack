import Vue from 'vue';
import App from '@/views/Home';
import router from '@/router'

const $vm = new Vue({
  el: '#root',
  router,
  components: { App },
  template: '<App/>'
});
Vue.use($vm);
