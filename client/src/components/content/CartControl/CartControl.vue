<template>
    <div class="cartcontrol">
        <transition name="fade">
            <i
                class="iconfont icon-icon-"
                @click.stop="ChangeFoodsCount(false)"
                v-if="food.count"
            ></i>
        </transition>

        <div class="cart-count" v-if="food.count">{{ food.count }}</div>
        <div class="add" @click.stop="ChangeFoodsCount(true)">
            <span>+</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        food: Object
    },
    methods: {
        // 监听改变食物数量按钮的点击
        ChangeFoodsCount(isAdd) {
            if (isAdd) {
                // 提交mutations 更新Vuex共享数据
                this.$store.commit('addFoodsCount', this.food)
            } else {
                this.$store.commit('subFoodsCount', this.food)
            }
        }
    },

}
</script>

<style scoped>
.cartcontrol {
    display: flex;
    align-items: center;
}

.cartcontrol .cart-count {
    margin: 0 7px;
    margin-right: 9px;
}

.iconfont {
    font-size: 27px;
}

.icon-icon- {
    color: #02a774 !important;
}

.add {
    width: 27px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    border-radius: 50%;
    background-color: #02a774;
    color: white;
    font-size: 17px;
    font-weight: bold;
}

/* 减少数量按钮的过渡动画 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(15px) rotate(180deg);
}
</style>

