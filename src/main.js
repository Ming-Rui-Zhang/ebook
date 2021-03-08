import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import i18n from './lang'
import './assets/styles/style.css'
import './assets/styles/global.scss'
import './utils/create-api'
// import './mock/index'

Vue.config.productionTip = false

new Vue({
 router,
 store,
 i18n,
 render(h) {
    return h(App)
  }
}).$mount('#app')
