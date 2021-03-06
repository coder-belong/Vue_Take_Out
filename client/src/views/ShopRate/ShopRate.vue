<template>
    <div id="rate-scroll-wrap" ref="rateScrollWrap">
        <div id="content">
            <!-- 综合评分 -->
            <div class="all-rate">
                <div class="left">
                    <p class="score">{{ shopInfo.score }}</p>
                    <p>综合评分</p>
                    <p class="height">高于周边商家99%</p>
                </div>
                <div class="right">
                    <!-- 服务态度 -->
                    <div class="server-score">
                        <start :score="shopInfo.serviceScore" />
                        <span>
                            服务态度
                            <span style="color: #f90">
                                {{ shopInfo.serviceScore }}
                            </span>
                        </span>
                    </div>
                    <!-- 商品评分 -->
                    <div class="goods-score">
                        <start :score="shopInfo.foodScore" />
                        <span>
                            商品评分
                            <span style="color: #f90">
                                {{ shopInfo.foodScore }}
                            </span>
                        </span>
                    </div>

                    <p>
                        送达时间：
                        <span style="color: #93999f">
                            {{ shopInfo.deliveryTime }}分钟
                        </span>
                    </p>
                </div>
            </div>

            <!-- 用户评价 -->
            <div class="user-rate">
                <!-- 评论分类按钮 -->
                <div class="cate-btn">
                    <div
                        class="item"
                        :class="{ active: RateType === 0 }"
                        @click="rateTypeClick(0)"
                    >
                        全部{{ userRate.length }}
                    </div>
                    <div
                        class="item"
                        :class="{ active: RateType === 1 }"
                        @click="rateTypeClick(1)"
                    >
                        满意{{ satisfyRate.length }}
                    </div>
                    <div
                        class="item"
                        :class="{ active: RateType === 2 }"
                        @click="rateTypeClick(2)"
                    >
                        不满意{{ disSatisfyRate.length }}
                    </div>
                    <!-- 只查看有内容的评价 -->
                    <div
                        class="shop-content-rate"
                        style="color: #93999f"
                        @click="showContentClick"
                    >
                        <i
                            class="iconfont icon-xuanzhong"
                            :class="{ active: showContentRata }"
                        ></i>
                        <span>只查看有内容的评价</span>
                    </div>
                </div>

                <!-- 用户评论信息 -->
                <div class="user-list" v-if="filterRate[0]">
                    <div
                        class="item"
                        v-for="(item1, index1) in filterRate"
                        :key="index1"
                    >
                        <div class="left">
                            <!-- 用户头像 -->
                            <img :src="item1.avatar" />
                        </div>
                        <div class="right">
                            <!-- 用户名 -->
                            <p class="user-name">{{ item1.username }}</p>
                            <!-- 评分 -->
                            <start :score="item1.score" />
                            <!-- 具体描述 -->
                            <p class="desc">
                                {{ item1.text }}
                            </p>
                            <!-- 推荐相关 -->
                            <div class="recommend">
                                <i
                                    class="iconfont icon-zan"
                                    v-show="item1.score > 3"
                                ></i>
                                <i
                                    class="iconfont icon-mianxing-11"
                                    v-show="item1.score <= 3"
                                ></i>
                                <!-- 推荐的食物 -->
                                <div class="food">
                                    <div
                                        class="item"
                                        v-for="(
                                            item2, index2
                                        ) in item1.recommend"
                                        :key="index2"
                                    >
                                        {{ item2 }}
                                    </div>
                                </div>
                            </div>

                            <!-- 评论时间 -->
                            <div class="time">
                                {{ item1.rateTime | dataFormat }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

import Start from '../../components/content/Start/Start'

import { getRate, getInfo } from '../../network/shop.js'

export default {
    components: {
        Start
    },
    data() {
        return {
            RateType: 0,  // 记录评论的类型 0：全部 1：满意 2：不满意
            shopInfo: {},  // 商家信息
            userRate: [],  // 所有的用户评论
            filterRate: [],  // 满意/不满意的用户评论
            showContentRata: false,  // 是否只看有内容的评价
        }
    },
    computed: {
        // 满意的评论信息
        satisfyRate() {
            return this.userRate.filter(val => val.score > 3)
        },

        // 不满意的评论信息
        disSatisfyRate() {
            return this.userRate.filter(val => val.score <= 3)
        },

        // 有内容的的评价
        contentRate() {
            return this.filterRate.filter(val => val.text)
        },
    },
    mounted() {
        // 获取用户评论数据
        this._getRate()
        // 获取商家信息
        this._getInfo()
    },

    watch: {
        userRate() {
            // 初始化better-scroll
            this.$nextTick(() => this.initScroll())
        }
    },
    methods: {
        /**
         * 事件监听相关
         */
        // 监听评论类型按钮的点击
        rateTypeClick(index) {
            this.RateType = index
            index === 0 ? this.filterRate = this.userRate : ''
            index === 1 ? this.filterRate = this.satisfyRate : ''
            index === 2 ? this.filterRate = this.disSatisfyRate : ''
        },

        // 监听查看是否查看有内容的按钮的点击
        showContentClick() {
            this.showContentRata = !this.showContentRata
            this.showContentRata ? this.filterRate = this.contentRate : this.filterRate = this.userRate
        },

        /**
         * 网络请求相关
         */
        // 获取用户评论数据
        async _getRate() {
            let res = await getRate()
            this.userRate = res
            this.filterRate = res
        },

        // 获取商家信息
        async _getInfo() {
            let res = await getInfo()
            this.shopInfo = res
        },

        /**
         * 函数方法相关
         */
        // 初始化BetterScroll
        initScroll() {
            new BScroll(this.$refs.rateScrollWrap, {
                click: true
            })
        }
    },
};
</script>

<style scoped>
/* 滚动区域 */
#rate-scroll-wrap {
    position: fixed;
    font-size: 14px;
    height: calc(100vh - 221px);
}

/* 综合评分 */
.all-rate {
    display: flex;
    align-items: center;
    text-align: center;
    height: 117px;
    font-size: 12px;
    border-bottom: 20px solid rgb(243, 245, 247);
}

/* 左侧 */
.all-rate .left {
    flex: 4;
    border-right: 1px solid #eaeaea;
}

.all-rate .left p {
    margin-bottom: 10px;
}

.all-rate .left .score {
    color: #f90;
    font-size: 24px;
}

.all-rate .left .height {
    color: #93999f;
}

/* 右侧 */
.all-rate .right {
    flex: 6;
    text-align: center;
}

.all-rate .right .server-score,
.all-rate .right .goods-score {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.server-score span,
.goods-score span {
    margin-left: 10px;
}

/* 用户评价 */
.user-rate {
    font-size: 12px;
}

/* 评价分类按钮 */
.user-rate .cate-btn {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.user-rate .cate-btn > .item {
    width: 64px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    margin-right: 15px;
    background-color: rgb(219, 221, 223);
}

.user-rate .cate-btn > .item.active {
    color: white;
    background-color: rgb(2, 167, 116);
}

/* 是否查看有内容的评价 */
.user-rate .cate-btn .shop-content-rate {
    margin-top: 23px;
    display: flex;
    align-items: center;
}
.user-rate .cate-btn .shop-content-rate span {
    font-size: 13px;
    margin-left: 7px;
}

.user-rate .cate-btn .shop-content-rate i {
    font-size: 28px;
}

.user-rate .cate-btn .shop-content-rate i.active {
    color: #02a774;
}

/* 用户评论信息  */
.user-list {
    padding: 20px;
    padding-top: 0;
    font-size: 12px;
}

.user-list > .item {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    margin-top: 17px;
}

/* 左侧头像区域 */
.user-list .item .left {
    flex: 1;
}

.user-list .item .left img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
}

/* 右侧评论数据 */
.user-list .item .right {
    flex: 9;
    position: relative;
    padding: 0 20px;
}

.user-list .item .right .user-name {
    margin-bottom: 7px;
}

.user-list .item .right .desc {
    margin: 7px 0;
    line-height: 20px;
}

.user-list .item .right .recommend {
    display: flex;
    align-items: center;
}

.user-list .item .right .recommend i {
    color: orange;
    margin-right: 8px;
    font-size: 14px;
}

.user-list .item .right .recommend .icon-mianxing-11 {
    color: gray;
}

.user-list .item .right .recommend .food {
    display: flex;
    flex-wrap: wrap;
}
.user-list .item .right .recommend .food .item {
    padding: 1.5px 5px;
    border: 1px solid #eaeaea;
    margin-right: 8px;
    margin-bottom: 3px;
    color: #93999f;
}

.user-list .item .right .time {
    position: absolute;
    top: 0;
    right: 0;
    color: #93999f;
}
</style>
