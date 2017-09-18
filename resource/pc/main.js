import Vue from 'vue'
import App from './App'

// 加载基础的样式
// import base from 'muse-components/styles/base.less' 
// import appBar from 'muse-components/appBar'
// import avatar from 'muse-components/avatar'

import { store } from './store/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  template: '<App/>',
  components: { App }
})
