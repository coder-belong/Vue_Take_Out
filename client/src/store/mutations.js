const mutations = {
    // 更新用户数据
    updateUserInfo(state, payload) {
        state.userInfo = payload
    },

    // 更新商家食物列表数据 （不包括分类）
    updateFoodsList(state, payload) {
        state.foodsList = payload
    },

    // 更新商家食物列表数据 （包括分类）
    updateGoodsList(state, payload) {
        // state.goodsList = payload
    },

    // 增加食物数量
    addFoodsCount(state, payload) {
        state.foodsList.forEach((val, index) => {
            // 比较数组中对象的地址值与传入过来的对象地址值是否一致
            if (val === payload) {
                state.foodsList[index].count++
            }
        })
    },

    // 减少食物数量
    subFoodsCount(state, payload) {
        state.foodsList.forEach((val, index) => {
            // 比较数组中对象的地址值与传入过来的对象地址值是否一致
            if (val === payload) {
                if (state.foodsList[index].count === 0) return
                state.foodsList[index].count--
            }
        })
    },

    
    // 将食物数量变为0 （清空效果）
    clearShopCartFoods(state) {
        state.foodsList.forEach(val => val.count = 0)
    },

}




export {
    mutations
}