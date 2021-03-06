/**
 * 入口JS文件
 */
Vue.config.productionTip = false

import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// 引入全局css样式
import './assets/css/reset.css'
import './assets/css/font.css'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './assets/img/loading.gif'
Vue.use(VueLazyload, {
    loading
})

// 引入MintUI组件库
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 加载Mock模拟的接口数据
import './mock/mockServer'

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟
import FastClick from 'fastclick'
// FastClick.attach(document.body)

// 全局过滤器
import './filter/index'


   

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')