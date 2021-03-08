<template>
  <transition name="fade">
    <div class="shelf-title" :class="{'hide-shadow': ifHideShadow}" v-show="shelfTitleVisible">
      <div class="shelf-menu-wepper">
        <div class="clear-cache" v-if="currentType === 1" @click.stop="clearCache">{{$t('shelf.clearCache')}}</div>
        <div class="back" @click.stop="back" v-else-if="!isEditMode">
          <span class="icon-zuo"></span>
        </div>
        <div class="modify-group" v-else @click="modifyGroupName">
          <span class="modify-group-text">{{$t('shelf.editGroup')}}</span>
        </div>
        <div class="title-wepper">
          <div class="title">{{title}}</div>
          <div class="have-selected-book" v-show="isEditMode">{{selectedBookState}}</div>
        </div>
        <div class="edit" v-if="shelfCategory.length === 0 || shelfCategory.itemList.length" @click.stop="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</div>
        <div class="edit-modify-group" v-else @click="modifyGroupName">
          <span class="modify-group-text">{{$t('shelf.editGroup')}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin.js'
  import { clearLocalStorage, saveBookShelf } from '../../utils/localStorage.js'
  import { clearLocalForage } from '../../utils/localForage.js'
  export default {
    mixins: [storeShelfMixin],
    data() {
      return {
        // 修改分组弹窗
        modifyGroupPopup: '',
        ifHideShadow: true,
        // 修改分组弹窗按钮
        modifyGroupNameBtns: [
          {
            text: this.$t('shelf.editGroupName'),
            type: '',
            click: () => {
              this.modifyGroupPopup.hide()
              const dialog = this.dialog({
                showNewGroup: true
              })
              dialog.show()
            }
          },
          {
            text: this.$t('shelf.deleteGroup'),
            type: 'danger',
            click: () => {
              this.whetherDeleteGroup()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            type: '',
            click: () => {
              this.modifyGroupPopup.hide()
            }
          }
        ],
        // 确认删除分组弹窗按钮
        deleteGroupBtns: [
          {
            text: this.$t('shelf.confirm'),
            type: 'danger',
            click: () => {
              this.deleteGroup()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            type: '',
            click: () => {
              this.modifyGroupPopup.hide()
            }
          }
        ]
      }
    },
    computed: {
      title() {
        return this.currentType === 1 ? this.$t('shelf.title') : this.shelfCategory.title
      },
      selectedBookState() {
        const shelfListLength = this.shelfSelected ? this.shelfSelected.length : 0
        if (shelfListLength === 0) {
          return this.$t('shelf.selectBook')
        } else if (shelfListLength === 1) {
          return this.$t('shelf.haveSelectedBook').replace('$1', 1)
        } else {
          return this.$t('shelf.haveSelectedBooks').replace('$1', shelfListLength)
        }
      }
    },
    methods: {
      onComplete() {
        this.modifyGroupPopup.hide()
        this.setShelfList(this.shelfList.filter(book => book.id !== this.shelfCategory.id))
            .then(() => {
              saveBookShelf(this.shelfList)
              this.back()
            })
      },
      // 删除分组
      deleteGroup() {
        this.moveOutFromGroup(this.shelfCategory.itemList, this.onComplete)
      },
      // 是否删除分组
      whetherDeleteGroup() {
        this.modifyGroupPopup.hide()
        setTimeout(() => {
          this.modifyGroupPopup = this.popup({
            title: this.$t('shelf.deleteGroupTitle'),
            btn: this.deleteGroupBtns
          })
          this.modifyGroupPopup.show()
        }, 200)
      },
      // 修改分组
      modifyGroupName() {
        this.modifyGroupPopup = this.popup({
          btn: this.modifyGroupNameBtns
        })
        this.modifyGroupPopup.show()
      },
      back() {
        this.$router.go(-1)
        this.setIsEditMode(false)
      },
      // 清除所有图书
      clearCache() {
        this.setIsEditMode(false)
        clearLocalStorage()
        clearLocalForage()
        this.setShelfList([])
        this.setShelfSelected([])
        this.getShelfList()
        this.simpleToast(this.$t('shelf.clearCacheSuccess'))
      },
      // 编辑图书
      onEditClick() {
        this.setShelfSelected([])
        this.setIsEditMode(!this.isEditMode)
      }
    },
    watch: {
      offsetY(offsetY) {
        offsetY > 0 ? this.ifHideShadow = false : this.ifHideShadow = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .shelf-title {
    position: absolute;
    background-color: white;
    z-index: 150;
    width: 100%;
    font-size: px2rem(16);
    line-height: px2rem(20);
    height: px2rem(42);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-menu-wepper{
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      height: px2rem(42);
      @include flexSpaceBetween;
      .clear-cache {
        width: px2rem(100);
        color: #A2A1A2;
        height: 100%;
        @include center;
        justify-content: flex-start;
      }
      .back {
        width: px2rem(100);
        height: 100%;
        @include center;
        justify-content: flex-start;
      }
      .modify-group {
        width: px2rem(100);
        height: 100%;
        @include center;
        justify-content: flex-start;
        color: #A2A1A2;
      }
      .title-wepper {
        @include columnCenter;
        .title{}
        .have-selected-book{
          font-size: px2rem(10);
        }
      }
      .edit {
        text-align: right;
        width: px2rem(100);
        color: #A2A1A2;
        height: 100%;
        @include center;
        justify-content: flex-end;
      }
      .edit-modify-group {
        width: px2rem(100);
        height: 100%;
        @include center;
        justify-content: flex-end;
        color: #A2A1A2;
      }
    }
  }
</style>
