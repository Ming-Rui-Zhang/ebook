<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisible || settingVisible >= 0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-gengduo_1"  @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-jindu"  @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-taiyang" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-select-font></ebook-select-font>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
  import EbookSettingFont from './EbookMenu/EbookSetingFont.vue'
  import EbookSelectFont from './EbookMenu/EbookSelectFontPopup.vue'
  import EbookSettingTheme from './EbookMenu/EbookSettingTheme.vue'
  import EbookSettingProgress from './EbookMenu/EbookSettingProgress.vue'
  import EbookSlide from './EbookMenu/EbookSlide.vue'
  import { ebookMixin } from '../../../utils/mixin.js'
  export default {
    components: {
      EbookSettingFont,
      EbookSelectFont,
      EbookSettingTheme,
      EbookSettingProgress,
      EbookSlide
    },
    mixins: [ebookMixin],
    methods: {
      showSetting(key) {
        if (this.settingVisible === key) {
          this.setSettingVisible(-1)
        } else {
          this.setSettingVisible(key)
        }
      }
    }
  }
</script>

<style lang="scss" scoped="scoped" rel="stylesheet/scss">
  @import '../../../assets/styles/global';
  .menu-wrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 130;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-jindu {
        font-size: px2rem(26);
      }
      .icon-taiyang {
        font-size: px2rem(24);
      }
    }
  }
</style>
