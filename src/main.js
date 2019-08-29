import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './sass/reset.scss'
import './sass/_variables.scss'
import './sass/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
