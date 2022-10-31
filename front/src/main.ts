import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createPinia} from "pinia"
const pinia=createPinia()
const app=createApp(App);
app.use(router).use(ElementPlus).use(pinia).mount('#app')

// createApp(App).use(router).mount('#app')

//全局注册图标组件
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}



