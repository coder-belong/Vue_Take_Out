<template>
    <div ref="wrap">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            scroll: '',  // scroll的实例
        }
    },
    mounted() {
        // 初始化BScroll
        this.initScroll()
    },
    methods: {
        // 初始化BScroll
        initScroll() {
            this.scroll = new BScroll(this.$refs.wrap, {
                click: true,
                probeType: 2,
            })

            this.scroll.on('scroll', position => {
                // 向父组件发射一个实时滚动的事件
                this.$emit('scroll', position)
            })

            this.scroll.on('scrollEnd', position => {
                // 向父组件发射一个滚动结束的事件
                this.$emit('scrollEnd', position)
            })
        }
    },
};
</script>

<style scoped>
</style>
