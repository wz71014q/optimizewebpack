import Vue from 'vue';
import App from './src/views/life/App';

const $vm = new Vue({
  el: '#root',
  components: { App },
  template: '<App/>',
});
Vue.use($vm);
console.log('success');