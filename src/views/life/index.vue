<template>
  <div>
    <p class="test-text">
      l
    </p>
  </div>
</template>

<script>
export default {
  name: 'Life',
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