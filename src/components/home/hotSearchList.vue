<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper"
    :top="52"
    @onScroll="onScroll"
    ref="scroll">
      <hot-search :label="$t('home.hotSearch')"
      :btn="$t('home.change')"
      :hotSearch="searchList.hotSearch"></hot-search>
      <div class="line" ></div>
      <hot-search :label="$t('home.historySearch')"
      :btn="$t('home.clear')"
      :hotSearch="searchHistory()"
      @onClick="clearSearchHistory()"
      ref="searchHistory"></hot-search>
    </scroll>
  </transition>
</template>

<script>
  import { getSearchHistory, clearSearchHistory } from '../../utils/localStorage.js'
  import { storeHomeMixin } from '../../utils/mixin.js'
  import Scroll from '../common/Scroll.vue'
  import hotSearch from './hotSearch.vue'
  export default {
    mixins: [storeHomeMixin],
    components: {
      Scroll,
      hotSearch
    },
    data() {
      return {
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: 'Self-11111',
              num: '1.0万'
            },
            {
              type: 1,
              text: '2222',
              num: '1.0万'
            },
            {
              type: 1,
              text: '3333',
              num: '1.0万'
            },
            {
              type: 1,
              text: '4444',
              num: '1.0万'
            },
            {
              type: 1,
              text: '5555',
              num: '1.0万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: 'Computer Science'
            },
            {
              type: 1,
              text: '11111 Science'
            },
            {
              type: 2,
              text: '2222 Science'
            },
            {
              type: 2,
              text: '3333 Science'
            },
            {
              type: 2,
              text: '4444 Science'
            }
          ]
        }
      }
    },
    methods: {
      searchHistory() {
        return this.getSearchHistory() ? this.getSearchHistory().reverse() : this.getSearchHistory()
      },
      clearSearchHistory() {
        clearSearchHistory()
        this.$refs.searchHistory.visiable = false
      },
      getSearchHistory() {
        return getSearchHistory()
      },
      onScroll(offsetY) {
        this.setHotSearchOffsetY(offsetY)
      },
      reset() {
        this.$refs.scroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="scoped">
  @import "../../assets/styles/global";
  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background-color: white;
    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      margin: px2rem(10) 0;
    }
  }
</style>
