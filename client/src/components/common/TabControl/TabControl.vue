<template>
    <div id="tab-control" ref="tabControl">
        <div
            class="item"
            v-for="(item, index) in tabTitle"
            :key="index"
            @click="tabClick(index)"
            :class="{ active: index === currentTab }"
        >
            {{ item }}
        </div>

        <!-- 绿色的线 -->
        <div class="line" ref="line"></div>
    </div>
</template>

<script>
export default {
    props: {
        tabTitle: Array  // 选项卡的标题
    },
    data() {
        return {
            currentTab: 0,  // 记录当前处于活跃的选项卡  默认为第一个
        }
    },
    computed: {
        currentLink() {
            // 记录刷新页面后的被激活的选项卡
            let path = location.pathname
            if (path === '/shop/food') {
                return 0
            }
            if (path === '/shop/rate') {
                return 1
            }
            if (path === '/shop/info') {
                return 2
            }
            return 0
        }
    },
    mounted() {
        // 初始化绿色的线的位置
        this.updateLine(this.currentLink)
        this.currentTab = this.currentLink  // 刷新页面后初始化currenTab
    },
    methods: {
        // 监听选项卡的点击
        tabClick(index) {
            // 更新当前选项卡
            this.currentTab = index
            // 更新绿色的线的位置
            this.updateLine(index)
            // 发射事件，让父组件知道选项卡发生了点击
            this.$emit('tabClick', index)
        },

        // 更新绿色的线的位置
        updateLine(index) {
            // 获取DOM元素
            let item = this.$refs.tabControl.children[index]
            let line = this.$refs.line
            // 设置绿色的线的偏移量
            let left = item.offsetLeft + item.offsetWidth / 2 - line.offsetWidth / 2
            line.style.left = left + 'px'
        }
    }
};
</script>

<style scoped>
/* 选项卡 */
#tab-control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 40px;
    border-bottom: 1px solid #eaeaea;
}
#tab-control .item {
    /* padding: 0 4px; */
    /* padding-bottom: 4px; */
    flex: 1;
    text-align: center;
    line-height: 40px;
    height: 40px;
    color: #4d555d;
    font-size: 14px;
}

#tab-control .item.active {
    /* border-bottom: 2px solid #02a774; */
    color: #02a774;
    font-weight: bold;
}

/* 绿色的线 */
#tab-control .line {
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 60px;
    height: 2px;
    background-color: #02a774;
    /* 线滑动的过渡动画 */
    transition: left 0.5s;
}
</style>
