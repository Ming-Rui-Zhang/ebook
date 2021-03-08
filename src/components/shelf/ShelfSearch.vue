<template>
  <div class="shelf-search-wepper" :class="{'search-top': ifInputClicked, 'hide-shadow': ifHideShadow}">
    <div class="shelf-search" :class="{'search-top': ifInputClicked}">
      <div class="shelf-input-wepper">
        <div class="icon-search"></div>
        <input type="text" v-model="inputText" class="shelf-input" :placeholder="$t('shelf.search')" @click.stop="onSearchClick">
        <div class="icon-clear-wrapper">
          <span class="icon-close" @click="onClearInputClick" v-show="inputText.length"></span>
        </div>
      </div>
      <div class="lang" @click.stop="changeLang" v-if="!ifInputClicked">
        <span class="icon-cn" v-show="lang"></span>
        <span class="icon-en" v-show="!lang"></span>
      </div>
      <div class="cancel-btn-wrapper" @click="onCancelClick()" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" :class="{showTab: !shelfTitleVisible}" v-if="ifInputClicked">
        <div class="shelf-search-tab-item"
          v-for="(item, index) in tabs" :key="index"
          @click="onTabClick(item.id)">
          <span class="shelf-search-tab-text" :class="{'is-selected': item.id === searchTab}">{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin.js'
  import { saveLocale, getLocale } from '../../utils/localStorage.js'
  export default {
    mixins: [storeShelfMixin],
    data() {
      return {
        ifInputClicked: false,
        inputText: '',
        searchTab: 1,
        ifHideShadow: true
      }
    },
    computed: {
      lang() {
        return this.$i18n.locale === 'cn' ? 0 : 1
      },
      tabs() {
        return [
          {
            id: 1,
            text: this.$t('shelf.default')
          },
          {
            id: 2,
            text: this.$t('shelf.progress')
          },
          {
            id: 3,
            text: this.$t('shelf.purchase')
          }
        ]
      }
    },
    methods: {
      onTabClick(id) {
        this.searchTab = id
      },
      onClearInputClick() {
        this.inputText = ''
      },
      onSearchClick() {
        this.ifInputClicked = true
        this.setShelfTitleVisible(false)
      },
      onCancelClick() {
        this.ifInputClicked = false
        this.setShelfTitleVisible(true)
      },
      // 更换语言
      changeLang() {
        let locale = getLocale()
         if (locale === 'cn') {
           locale = 'en'
         } else {
           locale = 'cn'
         }
         saveLocale(locale)
         this.$i18n.locale = locale
      }
    },
    watch: {
      offsetY(offsetY) {
        offsetY > 0 && this.ifInputClicked ? this.ifHideShadow = false : this.ifHideShadow = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-search-wepper{
    z-index: 120;
    background-color: white;
    position: relative;
    font-size: px2rem(16);
    line-height: px2rem(18);
    width: 100%;
    height: px2rem(84);
    box-sizing: border-box;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-search {
      position: absolute;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      height: px2rem(42);
      width: 100%;
      top: px2rem(42);
      @include center;
      transition: top $animationTime linear;
      &.search-top {
        top: 0;
      }
      .shelf-input-wepper {
        height: 100%;
        flex: 1 1 auto;
        height: px2rem(35);
        border: solid px2rem(2) #DBDADB;
        @include center;
        .icon-search {
          font-size: px2rem(14);
          width: px2rem(40);
          @include center;
        }
        .shelf-input {
          width: 100%;
          height: px2rem(18);
          border: none;
          font-size: px2rem(14);
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
        .icon-clear-wrapper {
          height: 100%;
          width: px2rem(42);
          @include center;
          .icon-close {
            width: 100%;
            height: 100%;
            @include center;
          }
        }
      }
      .lang {
        height: 100%;
        flex: 0 1 px2rem(55);
        font-size: px2rem(22);
        color: #666;
        @include center;
      }
      .cancel-btn-wrapper {
        height: 100%;
        flex: 0 1 px2rem(55);
        color: rgb(0, 203, 255);
        @include center;
        &:active {
          color: rgba(0, 203, 255, .5);
        }
      }
    }
    .shelf-search-tab-wrapper {
      position: absolute;
      top: px2rem(42);
      height: px2rem(42);
      @include center;
      width: 100%;
      .shelf-search-tab-item {
        height: 100%;
        flex: 1 1 auto;
        @include center;
        .shelf-search-tab-text {
          font-size: px2rem(12);
          color: #999;
          &.is-selected {
            color: $color-blue;
          }
        }
      }
    }
    &.search-top {
      position: fixed;
      top: 0
    }
  }
</style>
