<template>
  <div id="root">
    <!-- <router-view/> -->
    <ul>
      <li v-for="(val, name, index) in pageList" :key="index">
        <a :href="val">{{ name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
const pages = require('../pages');

export default {
  name: 'Home',
  data() {
    return {
      pageList: {}
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(pages)
      for(const property in pages) {
        this.pageList[property] = `${property}.html`
      }
    }
  }
};
</script>