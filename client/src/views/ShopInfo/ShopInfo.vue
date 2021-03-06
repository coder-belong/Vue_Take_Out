<template>
    <div id="shop-info-wrap" ref="scrollWrap">
        <div id="shop-info">
            <!-- 配送信息 -->
            <div class="send-info">
                <h4 class="title">配送信息</h4>
                <span class="brand">204专送</span>
                <span>
                    由商家配送提供配送，约
                    {{ shopInfo.deliveryTime }}分钟送达，距离
                    {{ shopInfo.distance }}
                </span>
                <p>配送费 ￥{{ shopInfo.deliveryPrice }}</p>
            </div>

            <!-- 服务与活动 -->
            <div class="server" v-if="shopInfo">
                <h4 class="title">活动与服务</h4>
                <div
                    class="item"
                    v-for="(item, index) in shopInfo.supports"
                    :key="index"
                >
                    <div class="left">{{ item.name }}</div>
                    <div class="right">{{ item.content }}</div>
                </div>
            </div>

            <!-- 商家实景 -->
            <div class="shop-view">
                <h4 class="title">商家实景</h4>
                <div class="photo photo-wrap" v-if="shopInfo">
                    <div class="content">
                        <img
                            v-for="(item, index) in shopInfo.pics"
                            :key="index"
                            :src="item"
                            @load="imgLoad"
                        />
                    </div>
                </div>
            </div>

            <!-- 商家信息 -->
            <div class="info">
                <h4 class="title">商家信息</h4>
                <div class="list">
                    <div class="item">
                        <div class="left">品类</div>
                        <div class="right">{{ shopInfo.category }}</div>
                    </div>
                    <div class="item">
                        <div class="left">商家电话</div>
                        <div class="right">{{ shopInfo.phone }}</div>
                    </div>
                    <div class="item">
                        <div class="left">地址</div>
                        <div class="right">{{ shopInfo.address }}</div>
                    </div>
                    <div class="item">
                        <div class="left">营业时间</div>
                        <div class="right">{{ shopInfo.workTime }}</div>
                    </div>
                </div>
            </div>

            <br v-for="i in 9" :key="i">
        </div>
    </div>
</template>

<script>
import { getInfo } from '../../network/shop.js'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            shopInfo: {},  // 商家信息
            shopInfoScroll: '',
            photoScroll: ''
        }
    },
    mounted() {
        // 获取商家信息
        this._getInfo()

    },
    watch: {
        shopInfo() {
            // 初始化Better-scroll
            this.$nextTick(() => this.initScroll())
        }
    },
    methods: {
        // 获取商家信息
        async _getInfo() {
            this.shopInfo = await getInfo()
        },

        // 初始化Better-scroll
        initScroll() {
            this.shopInfoScroll = new BScroll(this.$refs.scrollWrap, {
                click: true
            })

            this.photoScroll = new BScroll('.photo-wrap', {
                click: true,
                scrollX: true,  // 横向滚动
                scrollY: false,  // 纵向滚动
                momentumLimitDistance: 5,
            })
        },

        // 监听图片的加载完成
        imgLoad() {
           this.photoScroll.refresh()
           this.shopInfoScroll.refresh()
        }
    },
};
</script>

<style scoped>
/* 滚动的区域 */
#shop-info-wrap {
    position: fixed;
    width: 100vw;
    height: calc(100vh - 221px);
}

/* 复用样式 */
#shop-info > div {
    padding: 12px 10px;
    padding-right: 5px;
    font-size: 13px;
    color: #666666;
    border-bottom: 20px solid rgb(243, 245, 247);
}

/* 配送信息 */
.send-info p {
    margin-top: 10px;
}

.send-info .brand {
    margin: 0 12px 0 0;
    background-color: rgb(0, 151, 255);
    padding: 4px 3px;
    border-radius: 7px;
    color: white;
    line-height: 32px;
}

/* 标题 */
.title {
    font-weight: bold;
    font-size: 16px;
    color: black;
    margin-bottom: 15px;
}

/* 服务与活动 */
.server .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.server .item .left {
    width: 36px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: white;
    margin-right: 10px;
    background-color: #f1884f;
    border-radius: 4px;
}

.server .item:nth-child(2) .left {
    background-color: #70bc46;
}

.server .item:nth-child(3) .left {
    background-color: #f07373;
}

/* 商家实景 */
.shop-view .photo-wrap {
    white-space: nowrap;
}

.shop-view .photo-wrap .content {
    display: inline-block;
}
.shop-view .photo img {
    width: 110px;
    height: 90px;
    margin-left: 5px;
}

/* 商家信息 */
.info .list .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 43px;
    border-bottom: 1px solid #eaeaea;
    padding: 0 10px;
}

.info .list .item .left {
    font-weight: bold;
    color: black;
}

.info {
    padding-bottom: 0 !important;
    border: none !important;
}
</style>
