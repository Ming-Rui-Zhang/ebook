<template>
<transition name="slide-up">
  <div class="setting-wrapper" v-show="fontFamilyVisible">
    <div class="select-font-menu-warpper">
      <div class="icon" @click="showFontFamily()">
        <div class="icon-zuo2"></div>
      </div>
      <div class="select-font-text">
        <span>{{$t('book.selectFont')}}</span>
      </div>
    </div>
    <div class="select-font-list">
      <div class="select-font-list-item" v-for="(item , index) in fontFamilyList" :key="index" @click="setFontFamily(item.fontFamily)">
        <span class="item-fontFamily">{{item.fontFamily}}</span>
        <div class="icon-uniE90D" v-show="defaultFontFamily === item.fontFamily"></div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
  import { ebookMixin } from '../../../../utils/mixin.js'
  import { FONT_FAMILY_LIST } from '../../../../utils/book.js'
  import { setBookObject } from '../../../../utils/localStorage.js'
  export default {
    mixins: [ebookMixin],
    data() {
      return {
        fontFamilyList: FONT_FAMILY_LIST
      }
    },
    methods: {
      showFontFamily() {
        if (this.fontFamilyVisible) {
          this.setFontFamilyVisible(!this.fontFamilyVisible)
        }
      },
      setFontFamily(fontFamily) {
        this.setDefaultFontFamily(fontFamily)
        if (this.defaultFontFamily === 'Default') {
          this.currentBook.rendition.themes.font('Times New Roman')
        } else {
          this.currentBook.rendition.themes.font(fontFamily)
        }
        setBookObject(this.fileName, 'defaultFontFamily', this.defaultFontFamily)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="scoped">
  @import '../../../../assets/styles/global';
  .setting-wrapper {
    position: absolute;
    bottom: 0;
    z-index: 140;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: px2rem(248);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(16);
    .select-font-menu-warpper {
      @include center;
      height: px2rem(48);
      .icon {
        float: left;
        width: px2rem(48);
        height: px2rem(48);
        @include center;
        .icon-zuo2 {
          position: relative;
          align-items: center;
          left: px2rem(16);
        }
      }
      .select-font-text {
        position: relative;
        left: px2rem(-24);
        margin: auto;
      }
    }
    .select-font-list {
      height: px2rem(200);
      flex-flow: row nowrap;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .select-font-list-item {
        height: px2rem(40);
        @include center;
        position: relative;
        .item-fontFamily {
          left: px2rem(16);
          position: absolute;
          align-items: center;
          @include center;
        }
        .icon-uniE90D {
          font-size: px2rem(20);
          right: px2rem(20);
          position: absolute;
          align-items: center;
        }
      }
    }
  }
</style>
