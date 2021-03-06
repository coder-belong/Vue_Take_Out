<template>
    <div id="shop-cart">
        <div class="bottom-content">
            <div class="left">
                <!-- 购物车图标 -->
                <div
                    class="cart"
                    :class="{ active: $store.getters.totalCount }"
                    @click="ToggleShow"
                >
                    <div class="count" v-if="$store.getters.totalCount">
                        {{ $store.getters.totalCount }}
                    </div>
                    <i class="iconfont icon-gouwuche"></i>
                </div>
                <!-- 总价格 -->
                <div class="num">
                    <p class="price">￥{{ $store.getters.totalPrice }}</p>
                    <p class="other">
                        另需配送费￥{{ shopInfo.deliveryPrice }}元
                    </p>
                </div>
            </div>

            <div class="right" :class="{ active: enough }">
                <!-- 多少元起送 -->
                <div class="pay" v-show="!$store.getters.totalCount">
                    ￥{{ shopInfo.minPrice }}元起送
                </div>
                <div class="pay" v-show="$store.getters.totalCount && !enough">
                    还差￥{{ otherMonay }}元起送
                </div>
                <div class="pay" v-show="enough">结算</div>
            </div>
        </div>

        <transition name="move">
            <!-- 展开的购物车食物清单 -->
            <cart-food-list class="cart-food-list" v-if="ListShow" />
        </transition>

        <transition name="fade">
            <!-- 遮罩层 fiexed会有坑，要看父元素是否定位以及层级关系的z-index值 -->
            <div class="cover" v-show="ListShow" @click="ToggleShow"></div>
        </transition>
    </div>
</template>

<script>
import CartFoodList from './CartFoodList'

export default {
    components: {
        CartFoodList
    },
    props: {
        shopInfo: Object,  // 商家信息
    },
    data() {
        return {
            isShow: false,    // 控制遮罩层与购物车食品列表的展示
        }
    },
    computed: {
        // 还差多少配送 (总价格大于配送费)
        enough() {
            if (this.otherMonay <= 0) {
                return true
            }
        },

        // 计算差价
        otherMonay() {
            return this.shopInfo.minPrice - this.$store.getters.totalPrice
        },

        // 控制遮罩层与购物车食品列表的展示
        ListShow() {
            // 如果购物车中有食品数量并且isShow为true的状态，则展示
            if (this.isShow && this.$store.getters.totalCount) {
                return true
            } else {
                // 为什么这里要设置为false,自己看步骤调试
                this.isShow = false
                return this.isShow
            }
        }
    },

    methods: {
        // 监听购物车图标的点击 
        ToggleShow() {
            if (this.$store.getters.totalCount) {
                this.isShow = !this.isShow
            }
        }
    },

};
</script>

<style scoped>
#shop-cart {
    position: fixed;
    bottom: 0;
    z-index: 9;
    width: 100vw;
    height: 49px;
}

/* 遮罩层 */
#shop-cart .cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 49px);
    background-color: rgba(7, 17, 27, 0.6);
    backdrop-filter: blur(10px);
    z-index: 7;
}

#shop-cart .bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 999;
    height: 100%;
    background-color: rgb(20, 29, 39);
}

#shop-cart .left {
    display: flex;
    align-items: center;
    padding-left: 20px;
}

#shop-cart .left .cart {
    position: relative;
    top: -10px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 50%;
    z-index: 9;
    background-color: rgb(43, 52, 60);
}

#shop-cart .left .cart .count {
    position: absolute;
    top: -4px;
    right: -8px;
    color: white;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 15px;
    background-color: rgb(240, 20, 20);
    font-size: 12px;
}

#shop-cart .left .cart i {
    font-size: 24px;
    color: #80858a;
}
#shop-cart .left .cart.active {
    background-color: rgb(2, 167, 116);
}

#shop-cart .left .cart.active i {
    color: white;
}

#shop-cart .left .num {
    margin-left: 10px;
}

#shop-cart .left .num .price {
    font-size: 16px;
    color: white;
    font-weight: bold;
    margin-bottom: 8px;
}

#shop-cart .left .num .other {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
}

#shop-cart .right {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 104px;
    background-color: rgb(43, 51, 59);
}
#shop-cart .right.active {
    background-color: rgb(0, 180, 60);
}

#shop-cart .right .pay {
    color: white;
    font-size: 12px;
    font-weight: bold;
}

/* 展开的购物车清单 */
#shop-cart .cart-food-list {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    width: 100vw;
    z-index: 8 !important;
}

/* 遮罩层的过渡动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* 购物车清单的滑动效果 */
/* 控制过渡动画 */
.move-enter-active,
.move-leave-active {
    transition: transform 0.3s;
}

/* 进入的初始状态和离开的完成状态 */
.move-enter,
.move-leave-to {
    transform: translateY(0) !important;
}

/* 进入的完成状态和离开的初始状态 */
.move-enter-to,
.move-leave {
    transform: translateY(-100%) !important;
}
</style>
