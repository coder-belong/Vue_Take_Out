<template>
    <!-- 商家信息的弹出层 -->
    <transition name="fade">
        <div id="shopInfoModal" v-show="shopShow">
            <transition name="fade">
                <div class="shop-brief-modal" v-show="shopShow">
                    <div class="brief-modal-content">
                        <h2 class="content-title">
                            <span class="content-tag">
                                <span class="mini-tag">品牌</span>
                            </span>
                            <span class="content-name">{{
                                shopInfo.name
                            }}</span>
                        </h2>
                        <ul class="brief-modal-msg">
                            <li>
                                <h3>{{ shopInfo.score }}</h3>
                                <p>评分</p>
                            </li>
                            <li>
                                <h3>{{ shopInfo.sellCount }}</h3>
                                <p>月售</p>
                            </li>
                            <li>
                                <h3>204专送</h3>
                                <p>约{{ shopInfo.deliveryTime }}分钟</p>
                            </li>
                            <li>
                                <h3>{{ shopInfo.deliveryPrice }}元</h3>
                                <p>配送费用</p>
                            </li>
                            <li>
                                <h3>{{ shopInfo.distance }}</h3>
                                <p>距离</p>
                            </li>
                        </ul>
                        <h3 class="brief-modal-title">
                            <span>———— 公告 ————</span>
                        </h3>
                        <div class="brief-modal-notice">
                            {{ shopInfo.bulletin }}
                        </div>
                        <div class="mask-footer" @click="toggleShopShow">
                            <span class="iconfont icon-2guanbi"></span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        shopInfo: Object
    },
    data() {
        return {
            shopShow: false
        }
    },
    methods: {
        // 关闭模态框
        toggleShopShow() {
            this.shopShow = false
        }
    },
};
</script>

<style scoped>
/* 弹出的模态框样式 */
#shopInfoModal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
    font-size: 13px;
}
#shopInfoModal .shop-brief-modal {
    padding: 20px 10px;
    width: 320px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    border-radius: 7px;
    transform: translateY(-50px);
}

.content-title {
    text-align: center;
}

.content-title .mini-tag {
    padding: 2px 4px;
    background-color: rgb(255, 228, 52);
    border-radius: 3px;
}

.content-title .content-name {
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
}

.brief-modal-msg {
    padding: 0 10px;
    text-align: center;
    margin: 18px 0;
    display: flex;
    justify-content: space-between;
}

.brief-modal-msg h3 {
    font-size: 15px;
    font-weight: bold;
}

.brief-modal-msg p {
    color: #999999;
    margin-top: 8px;
    font-size: 12px;
}

.brief-modal-title {
    text-align: center;
    color: #999999;
    margin-bottom: 20px;
}

.brief-modal-notice {
    color: #333333;
    line-height: 25px;
    padding: 0 10px;
}

/* 关闭图标 */
.icon-2guanbi {
    position: absolute;
    left: 47%;
    bottom: -60px;
    font-size: 28px;
    z-index: 9;
    color: #eaeaea;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
