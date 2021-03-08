import { mapGetters, mapActions } from 'vuex'
import { goToBookDetail, appendAddToShelf, removeAddToShelf } from './store.js'
import { themeList, addCss, removeAllCss, getReadTimeByMinutes } from './book.js'
import { saveLocation, getBookmark, saveBookShelf, getBookShelf } from './localStorage.js'
import { shelf } from '../api/store.js'
export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName', // 书名
      'menuVisible', // 显示菜单栏
      'settingVisible', // -1:不显示, 0:字号, 1:主题, 2:进度, 3:目录
      'defaultFontSize', // 默认字体大小
      'defaultFontFamily', // 默认字体样式
      'fontFamilyVisible', // 显示字体样式框
      'defaultTheme', // 默认主题
      'bookAvailable', // 书籍解析是否完成
      'progress', // 进度值
      'section', // 章节
      'isPaginating',
      'currentBook', // 当前电子书的iframe
      'navigation', // 目录信息
      'cover', // 封面图片地址
      'metadata', // 书籍信息
      'paginate',
      'pageList',
      'offsetY', // 页面下拉距离
      'isBookmark' // 书签页
    ]),
    themeList() {
      return themeList(this)
    },
    // 获取章节名称
    getSectionName() {
      if (this.navigation) {
        return this.navigation[this.section].label
      }
      return ''
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPageList',
      'setOffsetY',
      'setisBookmark'
    ]),
    // 加载菜单主题
    initClobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    // 页面与导航栏同步
    refreshLocation() {
      // 获取当前页面
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        // 设置当前导航栏进度
        this.setProgress(Math.floor(progress * 100))
        // 设置当前章节，便于获取章节名称
        this.setSection(currentLocation.start.index)
        // 浏览器储存当前页面位置
        saveLocation(this.fileName, startCfi)
        // 获取当前标签
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setisBookmark(true)
          } else {
            this.setisBookmark(false)
          }
        } else {
          this.setisBookmark(false)
        }
      }
    },
    // 隐藏菜单栏
    toggleTitleAndMenu() {
      this.setMenuVisible(false)
    },
    // 展示或隐藏菜单栏及相关活动
    showOrHideMenu() {
      this.setMenuVisible(!this.menuVisible)
      if (this.settingVisible !== -1) {
        this.setSettingVisible(-1)
      }
      if (this.fontFamilyVisible) {
        this.setFontFamilyVisible(!this.fontFamilyVisible)
      }
    },
    // 当前阅读时间
    getReadTimeText(fileName) {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinutes(fileName))
    },
    // 展示当前页面
    display(href, cb) {
      if (href) {
        this.currentBook.rendition.display(href).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    }
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible',
      'search',
      'isEditMode'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible',
      'setSearch'
      ]),
      showBookDetail(book) {
        goToBookDetail(this, book)
      }
  }
}

export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode', // 编辑状态
      'shelfList', // 书架收藏图书列表
      'shelfSelected', // 被选中图书列表
      'shelfTitleVisible', // 书架标题状态
      'offsetY',
      'shelfCategory', // 书架分类列表数据
      'currentType' // 书架列表为1， 分类列表为2
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    showBookDetail(book) {
      goToBookDetail(this, book)
    },
    getShelfList() {
      let shelfList = getBookShelf()
      if (!shelfList) {
        shelf().then(response => {
          if (response.status === 200 && response.data && response.data.bookList) {
            shelfList = appendAddToShelf(response.data.bookList)
            saveBookShelf(shelfList)
            return this.setShelfList(shelfList)
          }
        })
      } else {
        return this.setShelfList(shelfList)
      }
    },
    getCategoryList(title) {
      this.getShelfList().then(() => {
        this.setShelfCategory(this.shelfList.filter(item => item.title === title && item.type === 2)[0])
      })
    },
    moveOutFromGroup(group, c) {
      this.setShelfList(this.shelfList.filter(book => {
        if (book.type === 2 && book.itemList) {
          book.itemList = book.itemList.filter((subBook) => group.indexOf(subBook) < 0)
        }
        return group.indexOf(book) < 0
      })).then(() => {
        this.addToShelf(group, c)
      })
    },
    addToShelf(group, c) {
      let shelfList = []
      if (this.shelfList) {
        shelfList = removeAddToShelf(this.shelfList)
      }
      shelfList = [].concat(shelfList, ...group)
      shelfList.forEach((item, index) => {
        item.id = index + 1
      })
      this.setShelfList(appendAddToShelf(shelfList))
      if (c) c()
    }
  }
}
