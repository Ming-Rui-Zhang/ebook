<template>
  <div class="shelf-item" :class="{'shelf-item-shadow': data.type != 3}">
    <component :is="item" :data="data"></component>
    <span class="icon-uniE917" :class="{'selected-book': selectBook, 'start-selected-book': !(isEditMode && data.type === 1)}"></span>
  </div>
</template>

<script>
    import { storeShelfMixin } from '../../utils/mixin.js'
    import ShelfItemAdd from './ShelfItemAdd.vue'
    import ShelfItemCategory from './ShelfItemCategory.vue'
    import ShelfItemBook from './ShelfItemBook.vue'
  export default {
    mixins: [storeShelfMixin],
    props: {
      data: Object
    },
    computed: {
      item() {
        return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
      },
      selectBook() {
        return this.shelfSelected.some((item) => {
          return item === this.data
        })
      }
    },
    data() {
      return {
        book: ShelfItemBook,
        category: ShelfItemCategory,
        add: ShelfItemAdd
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item {
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .8);
    }
  .icon-uniE917 {
    position: absolute;
    bottom: px2rem(10);
    right: px2rem(10);
    color: #ccc;
    font-size: px2rem(35);
    &.selected-book {
      color: $color-blue;
    }
    &.start-selected-book {
      display: none;
    }
  }
  }
</style>
