<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text"
          class="slide-contents-search-input"
          :placeholder="$t('book.searchHint')"
          @click="showSearchPage()"
          v-model="searchText"
          @keyup.enter.exact="search()">
      </div>
      <div class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage()">取消</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slid-contents-book-img-wrapper">
        <img :src="cover" alt="" class="slid-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
        <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
          <span class="progress">{{progress + '%'}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText(fileName)}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="48" ref="scroll" v-show="!searchVisible">
      <div class="slidee-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label"
        :style="contentItemStyle(item)"
        :class="{'selected': section === index}"
        @click="displayContent(item.href)">{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </scroll>
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div class="slide-search-item"
        v-for="(item, index) in searchList"
        :key="index"
        @click="displayContent(item.cfi, true)"
        v-html="item.excerpt"></div>
    </scroll>
  </div>
</template>

<script>
  import { ebookMixin } from '../../../../utils/mixin.js'
  import Scroll from '../../../common/Scroll.vue'
  import { px2rem } from '../../../../utils/utils.js'
  export default {
    mixins: [ebookMixin],
    components: {
      Scroll
    },
    data() {
      return {
        searchVisible: false,
        searchList: null,
        searchText: ''
      }
    },
    methods: {
      // 查询搜索字符
      search() {
        // 排空，否则全文搜索‘空’，耗时
        if (this.searchText && this.searchText.length > 0) {
            this.doSearch(this.searchText).then((list) => {
              this.searchList = list
              this.searchList.map(item => {
                item.excerpt = item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
                return item
              })
          })
        }
      },
      doSearch(q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            item => item.load(this.currentBook.load.bind(this.currentBook))
              .then(item.find.bind(item, q))
              .finally(item.unload.bind(item)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
      },
      displayContent(href, highlight = false) {
        this.display(href, () => {
          this.showOrHideMenu()
          if (highlight) {
            this.currentBook.rendition.annotations.highlight(href)
          }
        })
      },
      // 多级目录
      contentItemStyle(item) {
        return {
          marginLeft: `${px2rem(item.level * 15)}rem`
        }
      },
      showSearchPage() {
        this.searchVisible = true
      },
      // 隐藏查询页面
      hideSearchPage() {
        this.searchText = ''
        this.searchVisible = false
        this.searchList = null
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="scoped">
  @import "../../../../assets/styles/global";
  .ebook-slide-contents {
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;
        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          font-size: px2rem(20);
          @include center;
        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20);
      box-sizing: border-box;
      .slid-contents-book-img-wrapper {
        flex: 0 1 px2rem(45);
        .slid-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 0 1 auto;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        @include  ellipsis;
        .slide-contents-book-title {
          // width: px2rem(153.75);
          font-size: px2rem(14);
          line-height: px2rem(14);
          flex-grow: 1;
          .slide-contents-book-title-text {
            @include ellipsis2(2);
          }
        }
        .slide-contents-book-author {
          // width: px2rem(153.75);
          font-size: px2rem(12);
          line-height: px2rem(12);
          flex-shrink: 0;
          @include left;
          .slide-contents-book-author-text {
            @include ellipsis;
          }
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress {
          .progress-text {
            font-size: px2rem(12);
          }
          .progress {
            font-size: px2rem(14);
          }
        }
        .slide-contents-book-time {
          font-size: px2rem(12);
          margin-top: px2rem(5);
        }
      }
    }
    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slidee-contents-item {
        display: flex;
        padding: px2rem(20) 0;
        box-sizing: border-box;
        &.selected {
          top: px2rem(20);
        }
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }
        .slide-contents-item-page{}
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        line-height: px2rem(16);
        font-size: px2rem(14);
        padding: px2rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>
