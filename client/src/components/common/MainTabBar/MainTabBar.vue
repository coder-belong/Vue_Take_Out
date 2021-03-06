<template>
    <div class="tab-bar">
        <div
            class="item"
            :class="{ active: currentLink == '/home' }"
            @click="tabClick('/home')"
        >
            <i class="iconfont icon-waimai"></i>
            <p>首页</p>
        </div>
        <div
            class="item"
            :class="{ active: currentLink == '/search' }"
            @click="tabClick('/search')"
        >
            <i class="iconfont icon-search"></i>
            <p>搜索</p>
        </div>
        <div
            class="item"
            :class="{ active: currentLink == '/order' }"
            @click="tabClick('/order')"
        >
            <i class="iconfont icon-icon--copy"></i>
            <p>订单</p>
        </div>
        <div
            class="item"
            :class="{ active: currentLink == '/profile' }"
            @click="tabClick('/profile')"
        >
            <i class="iconfont icon-wode-copy-copy"></i>
            <p>个人</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentLink: location.pathname === '/' ? '/home' : location.pathname // 记录当前路由
        }
    },
    mounted() {
        //  console.log(location.pathname);
    },
   
    methods: {
        tabClick(link) {
            // 路由跳转
            this.$router.replace(link)
            // 记录当前处于活跃的路由
            this.currentLink = link
        }
    }
};
</script>

<style scoped>
.tab-bar {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100vw;
    bottom: 0;
    height: 49px;
    background: rgb(246, 246, 246);
    z-index: 999;
}

.tab-bar .item {
    flex: 1;
    text-align: center;
}

.tab-bar .item.active {
    color: green;
}

.tab-bar .item i {
    font-size: 27px;
}

.tab-bar .item p {
    margin-top: 6px;
    font-size: 12px;
}
</style>
