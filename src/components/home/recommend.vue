<template>
  <div class="recommend-wrapper">
    <div class="recommend-menu-wrapper">
      <div class="recommend-hotSearch">{{$t('home.recommend')}}</div>
      <div class="recommend-see-all" @click.stop="click()">{{$t('home.seeAll')}}</div>
    </div>
    <div class="recommend-list">
      <div class="recommend-item" @click.stop="showBookDetail(item)" v-for="(item, index) in data" :key="index">
        <div class="recommend-img-wrapper">
          <img :src="item.cover" alt="">
        </div>
        <div class="recommend-book-title">{{item.title}}</div>
        <div class="recommend-book-message">{{bookMessage(index)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin.js'
  export default {
    mixins: [storeHomeMixin],
    props: {
      data: Array
    },
    methods: {
      bookMessage(index) {
        return this.$t('home.readers').replace('$1', this.data[index].readers)
      },
      click() {
        console.log(this.data)
      }
    }
  }
</script>

<style scoped="scoped" lang="scss" rel='stylesheet/scss'>
  @import "../../assets/styles/global.scss";
  .recommend-wrapper {
    width: 100%;
    padding: px2rem(10);
    box-sizing: border-box;
    font-size: px2rem(13);
    line-height: px23rem(12);
    position: relative;
    @include flexColumn;
    .recommend-menu-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .recommend-hotSearch {
        font-size: px2rem(18);
        font-weight: bold;
      }
      .recommend-see-all {
        font-size: px2rem(14);
        color: rgba(64, 158, 255, 1);
        &:active {
          color: rgba(64, 158, 255, .5);
        }
      }
    }
    .recommend-list {
      padding-top: px2rem(20);
      width: 100%;
      display: flex;
      justify-content: space-between;
      .recommend-item {
        flex: 0 1 30%;
        @include flexColumn;
        justify-content: center;
        .recommend-img-wrapper {
          width: 100%;
          @include center;
          img {
            width: 100%;
          }
        }
        .recommend-book-title {
          padding-top: px2rem(10);
          @include ellipsis2(2);
          // font-size: px2rem(15);
          font-weight: bold;
          text-align: center;
        }
        .recommend-book-message {
          padding-top: px2rem(10);
          // font-size: px2rem(12);
          text-align: center;
        }
      }
    }
  }
</style>
