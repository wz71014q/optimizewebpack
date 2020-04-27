<template>
  <div>
    <p class="test-text">
      Home
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('MOUNTED')
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