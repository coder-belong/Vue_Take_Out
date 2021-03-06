<template>
    <transition name="fade">
        <div id="food" v-show="foodModalShow">
            <div class="content">
                <div class="header">
                    <img :src="food.image" />
                    <span class="desc">{{ food.info }}</span>
                    <i
                        class="iconfont icon-back-line"
                        @click="foodModalShow = false"
                    ></i>
                </div>

                <div class="food-info">
                    <div class="name">{{ food.name }}</div>
                    <div class="rate">
                        <span>月售{{ food.sellCount }}份</span>
                        <span>好评率{{ food.rating }}%</span>
                    </div>

                    <div class="num">
                        <div class="price" style="color: red">
                            ￥{{ food.price }}
                        </div>
                        <div class="count">
                            <cart-control :food="food" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 遮罩层 -->
            <div class="cover" @click="foodModalShow = false"></div>
        </div>
    </transition>
</template>

<script>
import CartControl from '../../../components/content/CartControl/CartControl'

export default {
    props: {
        food: Object
    },
    components: {
        CartControl
    },
    data() {
        return {
            foodModalShow: false
        }
    },
};
</script>

<style scoped>
#food {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
}
/* 遮罩层 （为了点击效果） */
#food .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 11;
}

#food .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 12;
    width: 300px;
    height: 400px;
    background-color: white;
    border-radius: 7px;
    transform: translateY(-35px);
}

#food .content .header {
    position: relative;
}

#food .content .header img {
    width: 100%;
    height: 300px;
}

#food .content .header .icon-back-line {
    font-size: 24px;
    position: absolute;
    top: 18px;
    left: 10px;
    color: white;
}

#food .content .header .desc {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #ddd;
}

#food .content .food-info {
    padding: 15px;
    position: relative;
}

#food .content .food-info > div {
    margin-bottom: 10px;
}

#food .content .food-info .name {
    font-size: 14px;
    font-weight: bold;
}

#food .content .food-info .rate {
    color: #93999f;
    font-size: 12px;
}

#food .content .food-info .rate span {
    margin-right: 15px;
}

#food .content .food-info .num {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 13px;
    padding-right: 15px;
}

#food .content .food-info .price {
    font-weight: bold;
    font-size: 15px;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
