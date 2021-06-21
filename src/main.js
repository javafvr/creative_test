import { createApp } from 'vue'
import store from './store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(store)
app.use(ElementPlus)
app.mount('#app')