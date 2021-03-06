<template>
    <!-- 购物车的食物列表清单 -->
    <div id="cart-food-list">
        <div class="title">
            <span>购物车</span>
            <span style="color: #00a0dc; font-size: 12px" @click="clearClick"
                >清空</span
            >
        </div>

        <!-- 滑动的区域 -->
        <scroll class="scroll-wrap" ref="scroll">
            <div class="food-list" v-if="$store.getters.shopCartFoods.length > 0">
                <div
                    class="item"
                    v-for="(item, index) in $store.getters.shopCartFoods"
                    :key="index"
                >
                    <span class="name" style="font-size: 12px">
                        {{ item.name }}
                    </span>
                    <span class="price" style="color: red"
                        >￥{{ item.price }}</span
                    >
                    <span class="count">
                        <cart-control :food="item" />
                    </span>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import CartControl from '../../../components/content/CartControl/CartControl'
import Scroll from '../../../components/common/Scroll/Scroll'

import { MessageBox } from 'mint-ui'

export default {
    components: {
        CartControl,
        Scroll
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scroll.scroll.refresh()
        })
    },
    methods: {
        // 监听清空按钮的点击
        clearClick() {
            // 弹出对话框
            MessageBox.confirm('确定清空购物车吗？').then(_ => {
                // 提交mutations 将所有商品数量初始化为0
                this.$store.commit('clearShopCartFoods')
            }).catch(_ => {
                console.log('取消操作');
            })

        }
    },

};
</script>

<style scoped>
.scroll-wrap {
    position: relative;
    z-index: 5;
    max-height: 196px;
    overflow: hidden;
    background-color: white;
}

.cart-food-list .title {
    position: relative;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    height: 41px;
    line-height: 41px;
    padding: 0 18px;
    font-size: 14px;
    background-color: rgb(243, 245, 247);
}

.cart-food-list .food-list .item {
    display: flex;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    padding: 0 18px;
    background-color: white;
    font-size: 12px;
    border-bottom: 1px solid #eaeaea;
}

.cart-food-list .food-list .item .name {
    width: 140px;
}
</style>
