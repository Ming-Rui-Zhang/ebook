<template>
  <div class="hot-search-title">
    <div class="btn-wrapper">
        <div class="label">{{label}}</div>
        <div class="btn" @click.stop="click">{{btn}}</div>
    </div>
    <div class="hot-search-list" v-show="visiable">
      <div class="hot-search-item" v-for="(item, index) in hotSearch" :key="index"
      @click.stop="changeSearch(item.text)">
        <div class="icon-wrapper">
          <span class="icon-book" v-if="item.type === 1"></span>
          <span class="icon-search" v-else></span>
        </div>
        <div class="hot-search-text-wrapper">
          <span class="text">{{item.text}}</span>
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
      label: String,
      btn: String,
      hotSearch: Array
    },
    data() {
      return {
        visiable: true
      }
    },
    methods: {
      changeSearch(data) {
        this.setSearch(data)
      },
      click() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="scoped">
  @import "../../assets/styles/global";
  .hot-search-title {
    display: flex;
    width: 100%;
    font-size: px2rem(13);
    padding: px2rem(10);
    box-sizing: border-box;
    flex-direction: column;
    .btn-wrapper {
      display: flex;
      .label {
        flex: 1;
        text-align: left;
        font-weight: bold;
        color: #666;
      }
      .btn {
        flex: 1;
        text-align: right;
        font-weight: bold;
        color: rgb(64, 158, 255);
        &:active {
          color: rgba(64, 158, 255, .5);;
        }
      }
    }
    .hot-search-list {
      width: 100%;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .hot-search-item {
        padding: px2rem(10) 0;
        display: flex;
        .icon-wrapper {
          flex: 0 0 px2rem(40);
          @include center;
          .icon-book {
            font-size: px2rem(16);
          }
          .icon-search {
            font-size: px2rem(16);
          }
        }
        .hot-search-text-wrapper {
          flex: 1;
          height: px2rem(35);
          @include columnLeft;
          .text {
            flex: 1;
            height: 100%;
            font-size: px2rem(14);
            font-weight: bold;
            color: #666;
            @include ellipsis;
            @include left;
          }
        }
      }
    }
  }
</style>
