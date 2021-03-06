<template>
    <div id="order">
        <!-- 顶部导航 -->
        <order-nav-bar />
        
        <!-- 没有登录时所展示的视图 -->
        <div class="not_login" v-show="!$store.state.userInfo.id">
            <img src='../../assets/img/order/person.png'>

            <h3>登录后查看外卖订单</h3>

            <p @click="loginClick">立即登录</p>
        </div>

        <!-- 登录时所展示的视图 -->
        <div class="login" v-show="$store.state.userInfo.id">

            <img src='../../assets/img/order/timg.gif'>

            <h3>暂无任何订单</h3>
        </div>
    </div>
</template>

<script>
import OrderNavBar from './childOrder/OrderNavBar'

export default {
    components: {
        OrderNavBar
    },
    methods: {
        // 跳转到登录路由
        loginClick() {
            this.$router.replace('/login')
        }
    },
};
</script>

<style scoped>
.not_login {
    text-align: center;
    padding-top: 130px;
}

.not_login h3, .login h3 {
    color: #666666;
    font-size: 19px;
    margin: 20px 0 ;
    font-weight: bold;
}

.not_login p {
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: white;
    margin: 0 auto;
    background-color: rgb(1,167,116);
    border-radius: 10px;
    font-size: 14px;
}

.login {
    position: relative;
    top: 44px;
    text-align: center;
}

.login img {
    width: 300px;
    height: 200px;
    margin-top: 80px;
}

</style>
