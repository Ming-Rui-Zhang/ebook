<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll class="store-shelf-Scroll-wrapper"
      ref="scroll" :top="0" :bottom="scrollBottom" @onScroll="onScroll">
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
  import ShelfFooter from '../../components/shelf/ShelfFooter.vue'
  import ShelfList from '../../components/shelf/ShelfList.vue'
  import { storeShelfMixin } from '../../utils/mixin.js'
  import ShelfSearch from '../../components/shelf/ShelfSearch.vue'
  import Scroll from '../../components/common/Scroll.vue'
  import ShelfTitle from '../../components/shelf/ShelfTitle.vue'
  export default {
    mixins: [storeShelfMixin],
    data() {
      return {
        scrollBottom: 0
      }
    },
    watch: {
      isEditMode(isEditMode) {
        this.scrollBottom = isEditMode ? 48 : 0
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    components: {
      ShelfTitle,
      Scroll,
      ShelfSearch,
      ShelfList,
      ShelfFooter
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      }
    },
    mounted() {
      this.getShelfList()
      this.setShelfCategory([])
      this.setCurrentType(1)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: white;
    .store-shelf-Scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
