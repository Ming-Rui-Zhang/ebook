<template>
  <div class="store">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped="scoped" rel="stylesheet/scss">
  @import '../../assets/styles/global';
  .store {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
