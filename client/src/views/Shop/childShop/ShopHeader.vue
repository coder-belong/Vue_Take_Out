<template>
    <div id="shop-header">
        <!-- 商家背景区域 -->
        <div class="bck">
            <img :src="shopInfo.bgImg" />
        </div>

        <!-- 主体区域 -->
        <div class="shop-info">
            <!-- 商家logo区域 -->
            <div class="logo">
                <img :src="shopInfo.avatar" />
            </div>
            <!-- 商家名称 -->
            <div class="name" @click="showShopInfoModal">
                <span class="brand">品牌</span>
                <span class="shop-name"
                    >{{ shopInfo.name }}
                    <i class="iconfont icon--arrow-right"></i>
                </span>
            </div>
            <!-- 商家描述 -->
            <div class="desc">
                <span>{{ shopInfo.score }}</span>
                <span>月售{{ shopInfo.sellCount }}单</span>
                <span
                    style="
                        background-color: #02a774;
                        border-radius: 7px;
                        padding: 2px;
                        color: white;
                    "
                    >204专送</span
                >
                <span>约{{ shopInfo.deliveryTime }}分钟</span>
                <span>距离{{ shopInfo.distance }}</span>
            </div>
            <!-- 优惠信息 -->
            <div class="discounts">
                <span class="first">首单</span>
                <span class="new-user"
                    >新用户下单立减17元(不与其它活动同享)</span
                >
                <span class="eight" @click="showSupportModal">
                    8个优惠
                    <i class="iconfont icon-sanx-down"></i>
                </span>
            </div>
        </div>

        <!-- 返回首页路由 -->
        <i class="iconfont icon-back-line" @click="$router.replace('/home')"></i>

        <!-- 商家信息模态框 -->
        <shop-info-show ref="shopInfoModal" :shopInfo="shopInfo" />

        <!-- 商家优惠的模态框 -->
        <shop-support-show ref="shopSupportModal" :shopInfo="shopInfo" />
    </div>
</template>

<script>
import ShopInfoShow from './ShopInfoShow'
import ShopSupportShow from './ShopSupportShow'

export default {
    components: {
        ShopInfoShow,
        ShopSupportShow
    },
    props: {
        shopInfo: Object
    },
    methods: {
        // 展示商家信息模态框
        showShopInfoModal() {
            this.$refs.shopInfoModal.shopShow = true
        },
        // 展示商家优惠模态框
        showSupportModal() {
            this.$refs.shopSupportModal.shopSupportShow = true
        }
    },
};
</script>

<style scoped>
/* 商家背景 */
.bck {
    height: 50px;
    overflow: hidden;
}
.bck img {
    width: 100vw;
}

/* 主体区域 */
.shop-info {
    position: relative;
    top: -40px;
    width: 90vw;
    margin: 0 auto;
    text-align: center;
}

/* 商家logo */
.shop-info .logo img {
    width: 66px;
    height: 66px;
    border: 1px solid #eaeaea;
}
/* 商家名称 */

.shop-info .name {
    margin: 10px 0;
}
.shop-info .name .brand {
    padding: 1px 3px;
    background-color: rgb(255, 238, 11);
    margin-right: 8px;
    font-size: 12px;
    font-weight: bold;
}

.shop-info .name .shop-name {
    font-size: 18px;
    font-weight: bold;
}

/* 商家描述 */
.shop-info .desc {
    font-size: 13px;
    margin-bottom: 10px;
    color: #333333;
}

.shop-info .desc span {
    margin-right: 8px;
}

/* 商家优惠信息 */
.shop-info .discounts {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #eaeaea;
    padding: 5px 0px;
    font-size: 13px;
    color: #333333;
    width: 95%;
    margin: 0 auto;
}

.shop-info .discounts .first {
    display: inline-block;
    color: white;
    background-color: #70bc46;
    font-weight: bold;
    width: 26px;
    height: 15px;
    font-size: 12px;
    line-height: 15px;
}

.shop-info .discounts .new-user {
    display: inline-block;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 10px;
}

#shop-header {
    position: relative;
    height: 180px;
}

/* 返回图标 */
.icon-back-line {
    position: absolute;
    top: 15px;
    left: 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
}
</style>
