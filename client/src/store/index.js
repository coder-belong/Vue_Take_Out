import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

// 定义Vuex共享的数据
const state = {
    userInfo: {},  // 存储用户数据
    foodsList: [],  // 存储商家食物数据 （不包括分类），每一项都是一个对象
    // goodsList: [],  // 存储商家商品数据 包括分类
}


const store = new VueX.Store({
    state,
    getters,
    mutations,
    actions,
})


export default store