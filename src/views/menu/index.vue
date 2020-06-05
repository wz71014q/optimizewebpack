<template>
  <div>
    <p class="test-text">
      Menu
    </p>
    <div>
      {{ data }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      data: ''
    };
  },
  mounted () {
    if (ISDEBUG) {
      this.data = mockData;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.test-text {
  font-size: 50px;
}
</style>