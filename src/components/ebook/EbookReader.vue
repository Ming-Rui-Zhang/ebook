<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @touchstart="moveStart"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"></div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin.js'
  import Epub from 'epubjs'
  import { getBookObject, getLocation } from '../../utils/localStorage.js'
  import { flatten } from '../../utils/book.js'
  import { getLocalForage } from '../../utils/localForage.js'
  export default {
    mixins: [ebookMixin],
    methods: {
      onMouseEnter(e) {
        this.mouseState = 1
        this.mouseStartTime = e.timeStamp
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove(e) {
        if (this.mouseState === 1) {
          this.mouseState = 2
        } else if (this.mouseState === 2) {
          let offsetY = 0
          if (this.firstOffsetY) {
            offsetY = e.pageY - this.firstOffsetY
            this.setOffsetY(offsetY)
          } else {
            this.firstOffsetY = e.pageY
          }
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseEnd(e) {
        const time = e.timeStamp - this.mouseStartTime
        if (time < 200) {
          this.mouseState = 4
        }
        if (this.mouseState === 2) {
          this.setOffsetY(0)
          this.firstOffsetY = null
          this.mouseState = 3
        } else {
          this.mouseState = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      move(e) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[0].pageY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.changedTouches[0].pageY
        }
        event.preventDefault()
        event.stopPropagation()
      },
      moveStart(e) {
        // this.firstPageX = e.changedTouches[0].pageX
        // this.firstPageY = e.e.changedTouches[0].pageY
      },
      moveEnd(e) {
        this.setOffsetY(0)
        this.firstOffsetY = 0
        // const X = e.changedTouches[0].pageX - this.firstPageX
        // if (X > 40) {
        //   this.prevPage()
        //   this.toggleTitleAndMenu()
        // } else if (X < -40) {
        //   this.nextPage()
        //   this.toggleTitleAndMenu()
        // }
      },
      // 获取书名，并初始化epubjs
      getEbookName() {
        const books = this.$route.params.fileName.split('|')
        const fileName = books[1]
        getLocalForage(fileName, (err, blob) => {
          if (!err && blob) {
            // 获取离线缓存电子书
            this.setFileName(books.join('/')).then(() => {
              this.initEpub(blob)
            })
          } else {
            // 获取在线电子书
            this.setFileName(books.join('/')).then(() => {
              const url = process.env.VUE_APP_EPUB_URL + '/' + this.fileName + '.epub'
              this.initEpub(url)
            })
          }
        })
      },
      parseBook() {
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        // 获取目录并处理目录
        this.book.loaded.navigation.then(nav => {
          const navItem = flatten(nav.toc)
          function find(item, level = 0) {
            return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
          }
          navItem.forEach(item => {
            item.level = find(item)
          })
          this.setNavigation(navItem)
        })
      },
      // 初始化epubjs
      initEpub(url) {
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.parseBook()
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display().then(() => {
          this.beforeBookMounted()
        })
        // 为iframe绑定事件
        /* this.initGesture() */
        this.rendition.hooks.content.register(contents => {
           Promise.all([
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/droidSans.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/qiYi.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/webfont.css`),
             contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/chBold.css`)
           ]).then(() => {})
        })
        // 分页
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (this.defaultFontSize / 16))
        }).then(locations => {
          // this.navigation.forEach(nav => {
          //   nav.pageList = []
          // })
          // locations.forEach(item => {
          //   const loc = item.match(/\[(.*)\]/)[1]
          //   this.navigation.forEach(nav => {
          //     if (nav.href) {
          //       console.log(item + '////' + nav.href)
          //       const href = nav.href.match(/\/(.*)\./)[1]
          //       console.log(loc, href)
          //       if (href === loc) {
          //         console.log('aa')
          //         nav.pageList.push(item)
          //       }
          //     }
          //   })
          //   let currentPage = 1
          //   this.navigation.forEach((nav, index) => {
          //     if (index === 0) {
          //       nav.page = 1
          //     } else {
          //       nav.page = currentPage
          //     }
          //     currentPage += nav.pageList.length + 1
          //   })
          // })
          // console.log(this.navigation)
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      },
      // 绑定事件
      /* initGesture() {
        this.rendition.on('touchstart', event => {
          // 获取一只手指点击屏幕的x轴位置
          this.touchStartX = event.changedTouches[0].clientX
          // 获取手指点击时间来判断是否是手指长按屏幕事件
          this.touchStartTime = event.timeStamp
        })
        this.rendition.on('touchend', event => {
          // 离开屏幕时获得x轴的偏移量
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          // 我们消耗的时间
          const time = event.timeStamp - this.touchStartTime
          // 判断滑动方向和方式
          // 划过时间需要小于500毫秒，偏移量大于40时我们进入上一页
          if (time < 500 && offsetX > 40) {
              this.prevPage()
              this.toggleTitleAndMenu()
          } else if (time < 500 && offsetX < -40) {
              // 切换到下一页
              this.nextPage()
              this.toggleTitleAndMenu()
          } else {
              // 显示标题和菜单栏
              this.showTitleAndMenu()
          }
          // 禁止默认事件和方法调用
          event.stopPropagation()
        }, { passive: true })
      }, */
      // 向上翻页
      prevPage () {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
        }
      },
      // 向下翻页
      nextPage () {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
        }
      },
      // 加载相关资源
      beforeBookMounted() {
        // 注册书本主题，加载本地主题
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.rendition.themes.select(this.defaultTheme)
        // 加载本地书的字体大小
        const defaultFontSize = getBookObject(this.fileName, 'defaultFontSize')
        if (defaultFontSize) {
          this.setDefaultFontSize(defaultFontSize)
          this.rendition.themes.fontSize(this.defaultFontSize + 'px')
        }
        // 加载本地书的字体样式
        const defaultFontFamily = getBookObject(this.fileName, 'defaultFontFamily')
        if (defaultFontFamily) {
          this.setDefaultFontFamily(defaultFontFamily)
          this.rendition.themes.font(this.defaultFontFamily)
        }
        // 加载本地书的主题
        const defaultTheme = getBookObject(this.fileName, 'defaultTheme')
        if (defaultTheme) {
          this.setDefaultTheme(defaultTheme)
          this.rendition.themes.select(this.defaultTheme)
        }
        // 加载菜单主题（导入本地数据defaultTheme后才能使用）
        this.initClobalStyle()
        // 加载上次阅读页面
        const cfi = getLocation(this.fileName)
        if (cfi) {
          this.currentBook.rendition.display(cfi).then(() => {
            this.refreshLocation()
          })
        }
      },
      onMaskClick(e) {
        if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
          return
        }
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
          this.toggleTitleAndMenu()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
          this.toggleTitleAndMenu()
        } else {
          this.showOrHideMenu()
        }
      }
    },
    mounted() {
      // 获取书名，并初始化epubjs
      this.getEbookName()
    }
  }
</script>

<style scoped="scoped" lang="scss" rel='stylesheet/scss'>
  @import "../../assets/styles/global.scss";
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask {
      position: absolute;
      z-index: 110;
      top: 0;
      left: 0;
      background: transparent;
      width: 100%;
      height: 100%;
    }
  }
</style>
