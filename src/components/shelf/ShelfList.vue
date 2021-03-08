<template>
  <div class="shelf-list" :style="{top: shelfListTop}">
    <transition-group name="list"
                      tag="div"
                      id="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id"
        @click="onItemClick(item)">
        <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
        <div :class="{'shelf-list-item-mask': isEditMode}"
          @click.stop="onMaskClick(item)"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import ShelfItem from './ShelfItem.vue'
  import { storeShelfMixin } from '../../utils/mixin.js'
  import { realPx, px2rem } from '../../utils/utils.js'
  import { goToStoreHome } from '../../utils/store.js'
  export default {
    mixins: [storeShelfMixin],
    props: {
      top: {
        type: Number,
        default: 84
      },
      data: {
        type: Array
      }
    },
    components: {
      ShelfItem
    },
    computed: {
      shelfListTop() {
        return px2rem(this.top) + 'rem'
      },
      itemHeight() {
        return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
      }
    },
    methods: {
      onMaskClick(item) {
        if (item.type === 1) {
          if (this.shelfSelected.some((index) => {
          return index === item
          })) {
            let selected = this.shelfSelected
            selected = selected.filter((index) => index !== item)
            this.setShelfSelected(selected)
            return ''
          }
          const selected = this.shelfSelected
          selected.push(item)
          this.setShelfSelected(selected)
        }
      },
      onItemClick(item) {
        if (item.type === 1) {
          this.showBookDetail(item)
        } else if (item.type === 2) {
          this.setShelfCategory(item)
          this.setCurrentType(2)
          this.$router.push({
            path: '/store/category',
            query: {
              title: item.title
            }
          })
        } else {
          goToStoreHome(this)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    #shelf-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .shelf-list-item-wrapper {
        position: relative;
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: px2rem(15);
        box-sizing: border-box;
        &.list-leave-active {
          display: none;
        }
        &.list-move {
          transition: transform .5s;
        }
        .shelf-list-title-wrapper {
          margin-top: px2rem(10);
        }
        .shelf-list-item-mask {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 300;
        }
      }
    }
  }
</style>
