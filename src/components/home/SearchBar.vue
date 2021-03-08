<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-uniE912 icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper"
      :class="{'hide-title': !titleVisible}"
      @click="hideHotSearch()">
        <span class="icon-zuo icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text" class="input"
          ref="input"
          :placeholder="$t('home.hint')"
          v-model="searchText"
          @click="showHotSearch()"
          @keyup.13.exact="toSearch">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
  import { saveSearchHistory } from '../../utils/localStorage.js'
  import { storeHomeMixin } from '../../utils/mixin.js'
  import hotSearchList from './hotSearchList.vue'
  export default {
    components: {
      hotSearchList
    },
    mixins: [storeHomeMixin],
    data() {
      return {
        searchText: '',
        titleVisible: true,
        shadowVisible: true,
        hotSearchVisible: false
      }
    },
    watch: {
      search(search) {
        this.searchText = search
        this.toSearch()
      },
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchOffsetY(offsetY) {
        if (offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      saveSearchHistory() {
        const searchHistory = {
          type: '1',
          text: this.searchText
        }
        saveSearchHistory(searchHistory)
      },
      toSearch() {
        this.saveSearchHistory()
        this.$router.push({
          path: '/store/list',
          query: {
            keyword: this.searchText
          }
        })
      },
      showFlapCard() {
        this.setFlapCardVisible(true)
      },
      hideHotSearch() {
        this.showTitle()
        this.hotSearchVisible = false
        if (this.offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      showHotSearch() {
        this.hideTitle()
        this.hideShadow()
        this.hotSearchVisible = true
        this.$nextTick(() => {
          this.$refs.hotSearch.reset()
        })
      },
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      },
      hideShadow() {
        this.shadowVisible = false
      },
      showShadow() {
        this.shadowVisible = true
      }
    }
  }
</script>

<style scoped="scoped" lang="scss" rel='stylesheet/scss'>
  @import "../../assets/styles/global.scss";
  .search-bar {
    position: relative;
    z-index: 150;
    width: 100%;
    height: px2rem(94);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-title {
      height: px2rem(52);
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      .title-text-wrapper {
        width: 100%;
        height: 100%;
        @include center;
      }
      .title-icon-shake-wrapper {
        position: absolute;
        top: 0;
        height: 100%;
        right: px2rem(15);
        @include center;
      }
    }
    .title-icon-back-wrapper {
      position: absolute;
      top: 0;
      left: px2rem(15);
      height: px2rem(42);
      z-index: 151;
      @include center;
      transition: all $animationTime $animationType;
      &.hide-title {
        height: px2rem(52);
      }
    }
    .search-bar-input-wrapper {
      position: absolute;
      display: flex;
      right: 0;
      top: px2rem(42);
      width: 100%;
      height: px2rem(52);
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      transition: top $animationTime $animationType;
      &.hide-title {
        top: 0;
      }
      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all $animationTime $animationType;
        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }
      .search-bar-input {
        flex: 1;
        width: 100%;
        height: 80%;
        background-color: #f4f4f4;
        border: #eee px2rem(1) solid;
        border-radius: px2rem(2);
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        @include left;
        .icon-search {
          color: #999;
        }
        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          background: transparent;
          color: #666;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
