<template>
    <div id="shop">
        <!-- 头部固定区域 -->
        <div class="header-fixed">
            <!-- 头部区域 -->
            <shop-header :shopInfo="shopInfo" />

            <!-- 选项卡 -->
            <shop-tab-control
                :tabTitle="['点餐', '评价', '商家']"
                @tabClick="tabClick"
            />
        </div>

        <!-- 选项卡对应的路由区域视图 -->
        <div class="main">
            <keep-alive>
                <!-- 展示子路由对应的视图 -->
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import ShopHeader from './childShop/ShopHeader'

import ShopTabControl from '../../components/common/TabControl/TabControl'

import { getGoods, getRate, getInfo, } from '../../network/shop.js'

export default {
    name: 'shop',
    components: {
        ShopHeader,
        ShopTabControl,
    },
    data() {
        return {
            curentIndex: 0, // 用于记录处于活跃的项选卡
            shopFoods: [],  // 商家食物
            shopRate: [],  // 商家评论
            shopInfo: {},  // 商家信息
        }
    },
    mounted() {
        // 获取食物信息
        this._getGoods()
        // 获取评分数据
        this._getRate()
        // 获取商家信息
        this._getInfo()
    },
    methods: {
        /**
         * 事件监听相关
         */
        // 监听选项卡的点击
        tabClick(index) {
            // 同步索引
            this.curentIndex = index
            // 路由跳转
            index === 0 ? this.$router.replace('/shop/food') : ''
            index === 1 ? this.$router.replace('/shop/rate') : ''
            index === 2 ? this.$router.replace('/shop/info') : ''
        },

        /**
         * 网络请求相关
         */
        // 获取食物信息
        async _getGoods() {
            this.shopFoods = await getGoods()
        },

        // 获取评分数据
        async _getRate() {
            this.shopRate = await getRate()
        },

        // 获取商家信息
        async _getInfo() {
            this.shopInfo = await getInfo()
        },

    }
};
</script>

<style scoped>
/* 头部固定 */
.header-fixed {
    position: fixed;
    background-color: #fff;
    top: 0;
    left: 0;
    /* width: 100vw; */
    z-index: 5;
    height: 221px;
}

.main {
    position: relative;
    top: 221px;
}
</style>
