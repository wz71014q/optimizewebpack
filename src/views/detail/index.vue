<template>
  <div>
    <p class="test-text">
      Detail
    </p>
    <div>
      {{ data }}
    </div>
  </div>
</template>

<script>
import mockData from '@/mock/mock';

export default {
  name: 'Detail',
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