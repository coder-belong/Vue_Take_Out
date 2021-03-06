<template>
    <div id="food">
        <!-- 左侧滚动区域 -->
        <div class="left">
            <!-- 左侧菜单栏 -->
            <left-menu :goodsList="goodsList" />
        </div>

        <!-- 右侧主体区域 -->
        <div class="right">
            <!-- 右侧食品 -->
            <right-content :goodsList="goodsList" />
        </div>

        <!-- 底部结算区域 -->
        <shop-cart :shopInfo="shopInfo" />
    </div>  
</template>

<script>
import LeftMenu from './childShopFood/LeftMenu'
import RightContent from './childShopFood/RightContent'
import ShopCart from './childShopFood/ShopCart'

import { getGoods, getInfo } from '../../network/shop.js'

export default {
    components: {
        LeftMenu,
        RightContent,
        ShopCart,
    },
    data() {
        return {
            goodsList: [],  // 食物列表
            shopInfo: {},  // 商家信息
        }
    },
    mounted() {
        // 获取食物列表
        this._getGoods()
        // 获取商家信息
        this._getInfo()
    },
    methods: {
        // 获取食物列表/分类
        async _getGoods() {
            let res = await getGoods()
            // 初始化每个食品的数量
            let arr = []
            res.forEach(val => {
                val.foods.forEach(val => {
                    val.count = 0
                    arr.push(val)
                })
            })
            
            // 将商家食物交给Vuex进行状态管理 （不包括分类）
            this.$store.commit('updateFoodsList', arr)

            // 将商家商品交给Vuex进行状态管理 （包括分类）
            // this.$store.commit('updateGoodsList', res)

            this.goodsList = res
        },

        // 获取商家信息 给底部购物车渲染
        async _getInfo() {
            let res = await getInfo()
            this.shopInfo = res
        }
    },
};
</script>

<style scoped>
#food {
    display: flex;
    height: calc(100vh - 221px);
}
#food .left {
    flex: 2;
    background-color: rgb(243, 245, 247);
}

#food .right {
    flex: 8;
}
</style>
