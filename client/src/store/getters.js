const getters = {
    // 计算商家食物的总价格
    totalPrice(state) {
        let price = 0
        state.foodsList.forEach(val => price += val.price * val.count)
        return price
    },

    // 计算商家食物的总数量
    totalCount(state) {
        let count = 0
        state.foodsList.forEach(val => count += val.count)
        return count
    },

    
    // 获取所有count > 0 的食物
    shopCartFoods(state) {
        let arr = []
        state.foodsList.forEach(val => val.count > 0 ? arr.push(val) : '')
        return arr
    }
}




export {
    getters
}