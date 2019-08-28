import Vue from 'vue'
import App from './App'
import router from './router'

import './sass/_variables.scss'
import './sass/main.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
