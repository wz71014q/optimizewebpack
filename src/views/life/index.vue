<template>
  <div>
    <p class="test-text">
      Life
    </p>
    <div>
      {{ data }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Life',
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