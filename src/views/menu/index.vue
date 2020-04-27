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
import mockData from '@/mock/mock';

export default {
  name: 'Menu',
  data() {
    return {
      data: ''
    };
  },
  created () {
    console.log(mockData)
  },
  mounted () {
    console.log('MOUNTED')
    this.data = mockData;
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