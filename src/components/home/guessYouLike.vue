<template>
  <div class="guess-you-like-wrapper">
    <div class="guess-you-like-title-wrapper">
      <div class="title">{{guessYouLike ? guessYouLike : ''}}</div>
      <div class="change"
      @click.stop="changeList()">{{change ? change : ''}}</div>
    </div>
    <div class="guess-you-like-list">
      <div class="guess-you-like-item"
      v-for="(item, index) in list3" :key="index"
      @click.stop="toBookDetail(item)">
        <div class="guess-you-like-book-img-wrapper">
          <img class="guess-you-like-book-img" :src="item.cover" alt="">
        </div>
        <div class="guess-you-like-book-content-wrapper">
          <div class="guess-you-like-book-title">{{item.title}}</div>
          <div class="guess-you-like-book-author">{{item.author}}</div>
          <div class="guess-you-like-book-message">{{message(index)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin.js'
  export default {
    mixins: [storeHomeMixin],
    props: {
      guessYouLike: String,
      change: String,
      list: Array,
      sameReader: String
    },
    data() {
      return {
        frequency: 0,
        numberOfBooks: 3
      }
    },
    methods: {
      toBookDetail(book) {
        this.showBookDetail(book)
      },
      getList() {
        if (this.list) {
          return this.list.slice(this.frequency, this.frequency + this.numberOfBooks)
        }
        return null
      },
      changeList() {
        if (this.frequency + this.numberOfBooks < this.list.length) {
          this.frequency = this.frequency + this.numberOfBooks
        } else {
          this.frequency = 0
        }
        this.getList()
      },
      message(index) {
        return this.sameReader.replace('$1', this.list[index].result)
      }
    },
    computed: {
      list3() {
        return this.list ? this.list.slice(this.frequency, this.frequency + this.numberOfBooks) : ''
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="scoped">
  @import "../../assets/styles/global";
  .guess-you-like-wrapper {
    margin-top: px2rem(15);
    flex-direction: column;
    font-size: px2rem(13);
    @include center;
    .guess-you-like-title-wrapper {
      padding: px2rem(5) px2rem(10);
      font-size: px2rem(18);
      width: 100%;
      height: px2rem(24);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {}
      .change {
        font-size: px2rem(14);
        color: rgba(64, 158, 255, 1);
        &:active {
          color: rgba(64, 158, 255, .5);
        }
      }
    }
    .guess-you-like-list {
      width: 100%;
      box-sizing: border-box;
      padding: px2rem(5) px2rem(10);
      .guess-you-like-item {
        display: flex;
        padding: px2rem(20) 0;
        .guess-you-like-book-img-wrapper {
          flex: 0 1 auto;
          .guess-you-like-book-img {
              width: px2rem(90);
              height: px2rem(130);
          }
        }
        .guess-you-like-book-content-wrapper {
          flex: 1 1 auto;
          padding-left: px2rem(10);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @include ellipsis;
          .guess-you-like-book-title {
            color: #333;
            font-weight: bold;
            @include ellipsis2(2);
            flex: 0 1 50%;
          }
          .guess-you-like-book-author {
            @include ellipsis;
            flex: 0 1 25%;
          }
          .guess-you-like-book-message {
            @include ellipsis;
            flex: 0 1 25%;
          }
        }
      }
    }
  }
</style>
