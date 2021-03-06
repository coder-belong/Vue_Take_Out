<template>
    <!-- 商家信息的优惠层 -->
    <transition name="fade">
        <div id="shopSupportModal" v-show="shopSupportShow">
            <transition name="fade">
                <div class="shop-brief-modal" v-show="shopSupportShow">
                    <div class="brief-modal-content">
                        <h2 class="content-title">
                            <span class="content-name">优惠活动</span>
                        </h2>

                        <!-- 服务与活动 -->
                        <div class="server" v-if="shopInfo.supports">
                            <div class="item" v-for="(item, index) in shopInfo.supports" :key="index">
                                <div class="left">{{ item.name }}</div>
                                <div class="right">
                                    {{ item.content }}
                                </div>
                            </div>
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
            shopSupportShow: false
        }
    },
    methods: {
        // 关闭模态框
        toggleShopShow() {
            this.shopSupportShow = false
        }
    },
};
</script>

<style scoped>
/* 弹出的模态框样式 */
#shopSupportModal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
}
#shopSupportModal .shop-brief-modal {
    padding: 20px 10px;
    padding-bottom: 35px;
    width: 320px;
    height: 240px;
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

.content-title .content-name {
    font-size: 20px;
    font-weight: bold;
    
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

/* 服务与活动 */
.server {
    margin-top: 15px;
}
.server .item {
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 10px;
    font-size: 12px;
}

.server .item .left {
    width: 36px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: white;
    margin-right: 10px;
    background-color: #f1884f;
    border-radius: 4px;
}

.server .item:nth-child(2) .left {
    background-color: #70bc46;
}

.server .item:nth-child(3) .left {
    background-color: #f07373;
}
</style>
