import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuex from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
  .use(store)
  // .use(Vuex)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
