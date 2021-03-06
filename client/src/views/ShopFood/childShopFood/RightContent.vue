<template>
    <div id="right-content">
        <!-- 滚动区域 -->
        <rigth-scroll
            class="right-scroll-wrap"
            ref="rightScroll"
            @scroll="scroll"
            @scrollEnd="scrollEnd"
        >
            <div class="foods" v-if="goodsList[0]">
                <div
                    class="list"
                    v-for="(item1, index1) in goodsList"
                    :key="index1"
                >
                    <div class="title">{{ item1.name }}</div>
                    <div
                        class="item"
                        v-for="(item2, index2) in item1.foods"
                        :key="index2"
                        @click="showFoodModal(item2)"
                    >
                        <div class="left">
                            <img v-lazy="item2.icon" @load="imgLoad" />
                        </div>
                        <div class="right">
                            <div class="name">{{ item2.name }}</div>
                            <p>{{ item2.description }}</p>
                            <p>
                                <span>月售{{ item2.sellCount }}份</span>
                                <span>好评率{{ item2.rating }}%</span>
                            </p>
                            <p class="price">￥{{ item2.price }}</p>
                            <div class="count">
                                <!-- 数量组件 -->
                                <cart-control :food="item2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br v-for="index in 15" :key="index" />
        </rigth-scroll>

        <!-- 展示食物的模态框 -->
        <food-modal ref="foodModal" :food="currentFood" />
    </div>
</template>

<script>
import FoodModal from './FoodModal'

import rigthScroll from '../../../components/common/Scroll/Scroll'
import CartControl from '../../../components/content/CartControl/CartControl'

export default {
    components: {
        FoodModal,

        rigthScroll,
        CartControl,
    },
    props: {
        goodsList: Array
    },

    data() {
        return {
            rightScroll: '',  // 右侧的滚动区域实例
            AllTitleY: [],  // 所有标题Y轴的偏移量
            currentFood: {},  // 存储当前点击的食物信息
        }
    },
    mounted() {
        // 初始化scroll实例
        this.rightScroll = this.$refs.rightScroll.scroll

        // 监听中央事件总线
        this.$bus.$on('menuClick', index => {
            this.rightScroll.scrollTo(0, -this.AllTitleY[index], 500)
        })
    },
    methods: {
        // 监听图片的加载
        imgLoad() {
            // 图片加载完成后重新计算滚动区域高度
            this.rightScroll.refresh()

            // 图片加载完成后获取所有标题相对于scroll-wrap的y轴偏移量 （用数组存储）
            let title = document.querySelectorAll('.right-scroll-wrap .title')
            title.forEach(val => {
                // 注：imgload会被触发多次，所以需要判断是否添加数组元素
                if (this.AllTitleY.length >= title.length) return
                this.AllTitleY.push(val.offsetTop)
            })
        },

        // 监听右侧食物的实时滚动
        scroll(position) {
            this.AllTitleY.forEach((item, index) => {
                if (-position.y >= item && -position.y < this.AllTitleY[index + 1]) {
                    // console.log(index);
                    // 发射中央事件总线
                    this.$bus.$emit('rightScroll', index)
                    return
                } else if (-position.y >= item && index === 8) {
                    this.$bus.$emit('rightScroll', index)
                    return
                }
            })

            // ------ 规律如下 -----
            // if (-position.y >= 0 && -position.y < 798) {
            //     console.log(0);
            // }

            // if (-position.y >= 798 && -position.y < 1130) {
            //     console.log(1);
            // }
        },

        // 监听滚动的结束
        scrollEnd(position) {
            let y = -position.y
            this.AllTitleY.forEach((item, index) => {
                if (y >= item && y < this.AllTitleY[index + 1]) {
                    // console.log(index);
                    // 发射中央事件总线
                    this.$bus.$emit('rightScroll', index)
                    return
                } else if (y >= item && index === 8) {
                    this.$bus.$emit('rightScroll', index)
                    return
                }
            })
        },

        // 监听食物的点击
        showFoodModal(food) {
            // 展示模态框
            this.$refs.foodModal.foodModalShow = true
            // 记录当前点击的食物的相关信息
            this.currentFood = food
        }
    },
};
</script>

<style scoped>
.right-scroll-wrap {
    position: fixed;
    background-color: #fff;
    height: calc(100vh - 221px);
}

#right-content {
    font-size: 13px;
    background-color: #fff;
    margin-bottom: 50px;
}

#right-content .list .title {
    height: 26px;
    line-height: 26px;
    background-color: rgb(243, 245, 247);
    color: #93999f;
    padding-left: 15px;
    border-left: 2px solid #02a774;
}

#right-content .list .item {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #eaeaea;
}

#right-content .list .item .left {
    flex: 3;
}

#right-content .list .item .left img {
    width: 57px;
    height: 57px;
}

#right-content .list .item .right {
    flex: 7;
    position: relative;
}

#right-content .list .item .right p {
    font-size: 12px;
    color: #93999f;
    margin: 8px 0;
}

#right-content .list .item .right p > span {
    margin-right: 15px;
}

#right-content .list .item .right .price {
    color: red;
}

#right-content .list .item .right .count {
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>
