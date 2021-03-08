<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <component :is="currentTab === 0 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item"
                :class="{selected: currentTab === 0}"
                @click="changeCurrentTab(0)">
                {{$t('book.navigation')}}
              </div>
              <div class="content-page-tab-item"
                :class="{selected: currentTab === 1}"
                @click="changeCurrentTab(1)">
                {{$t('book.bookmark')}}
              </div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <ebook-loading></ebook-loading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hide()"></div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../../../utils/mixin.js'
  import EbookSlideContents from './EbookSlideContents.vue'
  import EbookSlideBookmark from './EbookSlideBookmark.vue'
  import EbookLoading from './EbookLoading.vue'
  export default {
    mixins: [ebookMixin],
    components: {
      EbookLoading
    },
    data() {
      return {
        currentTab: 0,
        content: EbookSlideContents,
        bookmark: EbookSlideBookmark
      }
    },
    methods: {
      hide() {
        this.showOrHideMenu()
      },
      changeCurrentTab(numb) {
        this.currentTab = numb
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="scoped">
  @import "../../../../assets/styles/global";
  .slide-content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 140;
    display: flex;
    .content {
      flex: 0 0 85%;
      width: 85%;
      height: 100%;
      .content-page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .content-page {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        .content-page-tab {
          flex: 0 0 px2rem(48);
          width: 100%;
          height: px2rem(48);
          display: flex;
          .content-page-tab-item {
            flex: 1;
            font-size: px2rem(12);
            @include center;
          }
        }
      }
      .content-empty {
        width: 100%;
        height: 100%;
        @include center;
      }
    }
    .content-bg {
      flex: 0 0 15%;
      width: 15%;
      height: 100%;
    }
  }
</style>
