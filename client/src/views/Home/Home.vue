<template>
    <div id="home">
        <!-- 顶部导航条 -->
        <home-nav-bar :address="address" />

        <scroll class="scroll-wrap" ref="homeScroll">
            <!-- 轮播区域 -->
            <home-carousel :swiperData="swiperData" @imgLoad="imgLoad" />

            <!-- 附近商家 -->
            <home-shop :shopList="shopList" @imgLoad="imgLoad" />

            <br v-for="i in 5" :key="i">
        </scroll>
    </div>
</template>

<script>
import HomeNavBar from './childHome/HomeNavBar'
import HomeCarousel from './childHome/HomeCarousel'
import HomeShop from './childHome/HomeShop'

import Scroll from '../../components/common/Scroll/Scroll'

import { getPostion, getSwiperData, getShopList } from '../../network/home.js'

export default {
    components: {
        HomeNavBar,
        HomeCarousel,
        HomeShop,
        Scroll
    },
    data() {
        return {
            address: '',  // 地址
            swiperData: [],  // 轮播图数据
            shopList: [],  // 商家列表
        }
    },
    mounted() {
        // 获取地址
        this._getPostion()
        // 获取轮播图数据
        this._getSwiperData()
        // 获取商家列表
        this._getShopList()
    },
    methods: {
        imgLoad() {
            this.$refs.homeScroll.scroll.refresh()
        },
        /**
         * 网络请求相关
         */
        // 获取地址
        async _getPostion() {
            let res = await getPostion('40.10038,116.36867')
            this.address = res.name
        },

        // 获取轮播图数据
        async _getSwiperData() {
            let res = await getSwiperData()
            // 对数据进行处理
            let newArr = [[], []]
            let pageSize = 8
            res.forEach((item, index) => {
                if (index < pageSize) {
                    newArr[0].push(item)
                    return
                }
                newArr[1].push(item)
            })
            this.swiperData = newArr
        },

        // 获取商家列表
        async _getShopList() {
            let location = { latitude: '40.10038', longitude: '116.36867' }
            let res = await getShopList(location)
            this.shopList = res
        },

    }
};
</script>

<style scoped>
#home {
    margin-top: 44px;
    height: calc(100vh - 44px - 49px);
}

/* 滑动区域 */
.scroll-wrap {
    position: fixed;
    width: 100vw;
    top: 44px;
    height: calc(100vh - 44px - 49px);
}
</style>
