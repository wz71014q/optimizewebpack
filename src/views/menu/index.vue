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
import mockData from '@/service/menu';

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
    this.data = mockData;
    console.log('ISDEBUG: ', ISDEBUG)
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