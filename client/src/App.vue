<template>
    <div id="app">
        <keep-alive exclude="login,search,shop">
            <router-view></router-view>
        </keep-alive>

        <!-- <test /> -->

        <!-- 底部导航栏 通过当前活跃路由的数据来决定是否展示 -->
        <main-tab-bar v-if="$route.meta.isShowTabBar"></main-tab-bar>

    </div>
</template>

<script>
import MainTabBar from './components/common/MainTabBar/MainTabBar'
import Test from './Test'

import { autoLogin } from './network/login.js'

export default {
    components: {
        MainTabBar,
        Test,
    },
    mounted() {
        // 自动登录状态
        this._autoLogin()
    },
    methods: {
        // 自动登录状态
        async _autoLogin() {
            let res = await autoLogin()
            // 保存用户信息到Vuex里
            this.$store.commit('updateUserInfo', { id: res._id, phone: res.name })
        }
    }
};
</script>

<style scoped>
</style>
