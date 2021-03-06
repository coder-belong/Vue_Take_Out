<template>
    <div class="cartcontrol">
        <transition name="fade">
            <i
                class="iconfont icon-icon-"
            ></i>
        </transition>
        <i
                class="iconfont icon-icon-"
            ></i>

        <div class="cart-count" ></div>
        <div class="add" >
            <span>+</span>
        </div>
    </div>
</template>

<script>
export default {
   

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
    /* color: #02a774 !important; */
    /* font-weight: bold !important; */
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
    /* transition: all 0.3s; */
}


.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    /* opacity: 0; */
    /* transform: translateX(15px) rotate(180deg); */
}
</style>

