<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="index">
        <img class="shelf-item-category-img" :src="item.cover" alt="">
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-category {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .shelf-item-category-list {
      width: 100%;
      height: 100%;
      align-content: flex-start;
      display: flex;
      flex-wrap: wrap;
      padding-top: px2rem(5);
      box-sizing: border-box;
      .shelf-item-category-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        height: 33.33%;
        box-sizing: border-box;
        padding: 0 px2rem(2.5) px2rem(5);
        &:nth-child(3n+3) {
          padding-right: px2rem(5);
        }
        &:nth-child(3n+1) {
          padding-left: px2rem(5);
        }
        .shelf-item-category-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .shelf-item-category-bg {
      width: 100%;
      height: 100%;
      font-size: px2rem(30);
      color: #ccc;
      background: white;
      @include center;
    }
  }
</style>
