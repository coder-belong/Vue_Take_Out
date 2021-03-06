<template>
    <div id="menu">
        <!-- 左侧滚动区域 -->
        <scroll id="scroll-wrap" ref="leftScroll">
            <div class="list" v-if="goodsList[0]">
                <div
                    class="item"
                    v-for="(item, index) in goodsList"
                    :key="index"
                    :class="{ active: index === currentIndex }"
                    @click="menuClick(index)"
                >
                    <img
                        :src="item.icon"
                        width="12px"
                        height="12px"
                        v-if="item.icon"
                    />
                    {{ item.name }}
                </div>
            </div>

            <br v-for="index in 7" :key="index" />
        </scroll>
    </div>
</template>

<script>
import Scroll from '../../../components/common/Scroll/Scroll'

export default {
    props: {
        goodsList: Array
    },
    components: {
        Scroll
    },
    data() {
        return {
            currentIndex: 0 // 记录处于活跃的菜单栏
        }
    },
    mounted() {
        // 监听中央事件总线
        this.$bus.$on('rightScroll', index => {
            this.currentIndex = index
        })
    },
    computed: {
        LeftScroll() {
            return this.$refs.leftScroll.scroll
        }
    },
    watch: {
        goodsList() {
            // 数据页面渲染加载完成后在计算可滚动区域高度
            this.$nextTick(() => {
                this.LeftScroll.refresh()
            })
        }
    },
    methods: {
        // 监听菜单栏的点击
        menuClick(index) {
            this.currentIndex = index
            // 发射中央事件总线
            this.$bus.$emit('menuClick', index)
        }
    }
};
</script>

<style scoped>
#scroll-wrap {
    position: fixed;
    height: calc(100vh - 221px);
}

#menu .list .item {
    width: 80px;
    height: 49px;
    text-align: center;
    line-height: 49px;
    background-color: rgb(243, 245, 247);
    border-bottom: 1px solid #d6d2d2;
    font-size: 13px;
}

#menu .list .item.active {
    background-color: #fff;
    color: #02a774;
    border-left: 1px solid #02a774;
    font-weight: bold;
}
</style>
