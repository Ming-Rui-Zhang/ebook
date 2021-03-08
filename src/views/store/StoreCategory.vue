<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll class="store-shelf-Scroll-wrapper"
            ref="scroll" :top="0"
            :bottom="scrollBottom"
            @onScroll="onScroll"
            v-if="ifShowList">
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="store-shelf-empty-view" v-else>
      {{$t('shelf.groupNone')}}
    </div>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
  import ShelfFooter from '../../components/shelf/ShelfFooter.vue'
  import ShelfList from '../../components/shelf/ShelfList.vue'
  import { storeShelfMixin } from '../../utils/mixin.js'
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
          if (this.$refs.scroll) {
            this.$refs.scroll.refresh()
          }
        })
      }
    },
    components: {
      ShelfTitle,
      Scroll,
      ShelfList,
      ShelfFooter
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
      }
    },
    mounted() {
      this.getCategoryList(this.$route.query.title)
      this.setCurrentType(2)
    },
    computed: {
      ifShowList() {
        return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      }
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
    .store-shelf-empty-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: px2rem(14);
      color: #333;
      @include center;
    }
  }
</style>
