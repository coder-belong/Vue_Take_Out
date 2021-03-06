import myaxios from './network'

// 注：以下接口为Mockjs模拟的接口

// 获取商家的食物列表
function getGoods() {
    return myaxios({
        url: `/goods`,
    })
}

// 获取用户的评论信息
function getRate() {
    return myaxios({
        url: `/rate`,
    })
}

// 获取商家信息
function getInfo() {
    return myaxios({
        url: `/info`,

    })
}


export {
    getGoods,
    getRate,
    getInfo,
}