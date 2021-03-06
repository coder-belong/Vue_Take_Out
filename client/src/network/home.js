import myaxios from './network'

// 获取首页位置
function getPostion(hash) {
    return myaxios({
        url: `/position/${hash}`,
    })
}

// 获取首页轮播数据
function getSwiperData() {
    return myaxios({
        url: `/index_category`,
    })
}

// 获取首页商家列表
function getShopList({ latitude, longitude }) {
    return myaxios({
        url: `/shops`,
        params: {
            latitude,
            longitude
        }

    })
}

// 根据经纬度和关键字搜索商家店铺
function searchShopList(geohash, keyword) {
    return myaxios({
        url: `/search_shops`,
        params: {
            geohash,
            keyword
        }

    })
}


export {
    getPostion,
    getSwiperData,
    getShopList,
    searchShopList
}