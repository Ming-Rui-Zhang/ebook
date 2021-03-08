<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-book-mark></ebook-book-mark>
    <ebook-header></ebook-header>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import ebookReader from '../../components/ebook/EbookReader.vue'
import ebookTitle from '../../components/ebook/EbookMenuAneTitle/EbookTitle.vue'
import ebookMenu from '../../components/ebook/EbookMenuAneTitle/EbookMenu.vue'
import ebookBookMark from '../../components/ebook/EbookBookMark.vue'
import ebookHeader from '../../components/ebook/EbookHeader.vue'
import ebookFooter from '../../components/ebook/EbookFooter.vue'
import { getReadTime, saveReadTime } from '../../utils/localStorage.js'
import { ebookMixin } from '../../utils/mixin.js'
export default {
  mixins: [ebookMixin],
  components: {
    ebookReader,
    ebookTitle,
    ebookMenu,
    ebookBookMark,
    ebookHeader,
    ebookFooter
  },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move(v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    restore() {
      this.$refs.ebook.style.top = 0 + 'px'
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  },
  watch: {
    offsetY: function(v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped="scoped" rel="stylesheet/scss">
  @import '../../assets/styles/global';
  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
