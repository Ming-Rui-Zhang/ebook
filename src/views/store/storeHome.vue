<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{'backgroundImage': `url('${banner}')`}"></div>
      </div>
      <guess-you-like :guessYouLike="$t('home.guessYouLike')" :change="$t('home.change')" :sameReader="$t('home.sameReader')" :list="guessYouLike"></guess-you-like>
      <recommend :data="recommend"></recommend>
      <featured class="featured" :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')"></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="category" :data="category"></category>
    </scroll>
  </div>
</template>

<script>
  import Category from '../../components/home/Category.vue'
  import CategoryBook from '../../components/home/CategoryBook.vue'
  import Featured from '../../components/home/Featured.vue'
  import recommend from '../../components/home/recommend.vue'
  import guessYouLike from '../../components/home/guessYouLike.vue'
  import FlapCard from '../../components/home/FlapCard.vue'
  import Scroll from '../../components/common/Scroll.vue'
  import SearchBar from '../../components/home/SearchBar.vue'
  import { storeHomeMixin } from '../../utils/mixin.js'
  import { home } from '../../api/store.js'
  export default {
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      Scroll,
      FlapCard,
      guessYouLike,
      recommend,
      Featured,
      CategoryBook,
      Category
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 52
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      }
    },
    data() {
      return {
        scrollTop: 94,
        random: null,
        banner: '',
        guessYouLike: null,
        recommend: null,
        featured: null,
        categoryList: null,
        category: null
      }
    },
    mounted() {
      home().then(response => {
        if (response && response.status === 200) {
          const data = response.data
          const randomIndex = Math.floor(Math.random() * data.random.length)
          this.random = data.random[randomIndex]
          this.banner = data.banner
          this.guessYouLike = data.guessYouLike
          this.recommend = data.recommend
          this.featured = data.featured
          this.categoryList = data.categoryList
          this.category = data.categories
        }
      })
    }
  }
</script>

<style lang="scss" scoped="scoped" rel="stylesheet/scss">
  @import '../../assets/styles/global';
  .store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .featured {
        padding-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .category {
      margin-top: px2rem(20);
    }
  }
</style>
