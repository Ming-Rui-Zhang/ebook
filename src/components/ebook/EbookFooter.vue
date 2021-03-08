<template>
  <div class="ebook-footer">
    <span class="ebook-footer-text">{{this.bookAvailable ? this.progress + '%' : '加载中'}}</span>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin.js'
  export default {
    mixins: [ebookMixin]
  }
</script>

<style scoped="scoped" lang="scss" rel='stylesheet/scss'>
  @import "../../assets/styles/global.scss";
  .ebook-footer {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(15);
    height: px2rem(48);
    @include right;
    .ebook-footer-text {
      font-size: px2rem(12);
      color: #6d7178;
    }
  }
</style>
