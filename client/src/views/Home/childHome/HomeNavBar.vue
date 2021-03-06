<template>
    <div>
        <nav-bar>
            <span slot="left" class="iconfont icon-search"></span>
            <span slot="center">{{ address.substr(0, 10) }}...</span>
            <span slot="right">
                <!-- 未登录时所展示的 -->
                <span v-show="!$store.state.userInfo.id" @click="loginClick">登录|注册</span>
                <!-- 登录后所展示的视图 -->
                <span v-show="$store.state.userInfo.id" class="iconfont icon-wode-copy-copy"></span>
            </span>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from '../../../components/content/NavBar/NavBar'

export default {
    props: {
        address: String
    },
    components: {
        NavBar
    },
    methods: {
        loginClick() {
            // 跳转到登录界面
            this.$router.replace('/login')
        }
    },


};
</script>

<style scoped>
.icon-wode-copy-copy {
    font-size: 22px;
}
</style>
