<template>
    <div id="shop">
        <div class="top">
            <i class="iconfont icon-icon--copy"></i>
            <span>附近商家</span>
        </div>

        <!-- 商家列表 -->
        <div class="shop-list">
            <div
                class="shop-item"
                v-for="(item, index) in shopList"
                :key="index"
                @click="shopItemClick"
            >
                <!-- 左侧的商家图片 -->
                <div class="left">
                    <img v-lazy="shopImg[index]" @load="imgLoad" />
                </div>
                <!-- 中间的商家信息 -->
                <div class="center">
                    <section>
                        <div class="shop-info">
                            <span class="brand">品牌</span>
                            <span class="name">{{ item.name }}</span>
                        </div>
                        <div class="rate">
                            <start :score="item.rating" />
                            <span class="score">{{ item.rating }}</span>
                            <span class="sale"
                                >月售{{ item.recent_order_num }}单</span
                            >
                        </div>
                        <div class="price">
                            <p>¥20起送 / {{ item.piecewise_agent_fee.tips }}</p>
                        </div>
                    </section>
                </div>
                <!-- 右侧的一些许可承诺 -->
                <div class="right">
                    <div class="promise">
                        <span>保</span>
                        <span>准</span>
                        <span>票</span>
                    </div>
                    <p class="send">204专送</p>
                </div>
            </div>
        </div>

        <!-- 骨架图效果 -->
        <div class="wrap" v-show="shopList.length === 0">
            <li v-for="i in 10" :key="i">
                <img src="../../../assets/img/shop_back.svg" />
            </li>
        </div>
    </div>
</template>

<script>

import Start from '../../../components/content/Start/Start'

export default {
    components: {
        Start
    },
    props: {
        shopList: Array,
    },
    data() {
        return {
            // 商家logo
            shopImg: [
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F84%2F34%2F72%2Ff993a043_E843472_c6eaa8f4.png%21%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fpng&refer=http%3A%2F%2Fimg.51miz.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617516828&t=67166137174dbc2c4ded7b8cb51d73f6',
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2018%2F06%2F16%2FFggtuHbSAySlqmiaexyim1Wc0oDK.jpg&refer=http%3A%2F%2Fimg.yzcdn.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617516828&t=054b4c85ef13607f4e22be2f4b65f275',
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa4.att.hudong.com%2F70%2F12%2F20300565183939154140121276245.jpg&refer=http%3A%2F%2Fa4.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617516828&t=2e87deb853d6ff61f19d536d02cb119d',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1312024051,425215055&fm=26&gp=0.jpg',
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2015%2F10%2F16%2F144500867691141352.jpg&refer=http%3A%2F%2Fimg.yzcdn.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617516828&t=b8764ad1b00c8682fd39ac9eea120fd4',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=548363586,3112931032&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1128646459,1050596937&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=548363586,3112931032&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1128646459,1050596937&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=548363586,3112931032&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1128646459,1050596937&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=548363586,3112931032&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1128646459,1050596937&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=548363586,3112931032&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1128646459,1050596937&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=548363586,3112931032&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1128646459,1050596937&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306551651,2605664237&fm=26&gp=0.jpg',


            ]
        }
    },
    methods: {
        // 商家店铺的点击
        shopItemClick() {
            // 跳转到商家详情页面
            this.$router.push('/shop')
        },

        imgLoad() {
            this.$emit('imgLoad')
        }
    },
};
</script>

<style scoped>
#shop {
    padding: 0 10px;
    background: #fff;
}
.top {
    font-size: 15px;
    color: #666666;
    padding: 15px 0 0 0;
}
.top i {
    margin-right: 14px;
}

.shop-list .shop-item {
    display: flex;
    justify-content: space-between;
    height: 90px;
    margin-top: 10px;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
    padding-top: 10px;
}

.shop-list .shop-item .left img {
    width: 95px;
    height: 70px;
    border: 1px solid #f1f1f1;
}

.shop-list .shop-item .center section {
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    height: 75%;
    padding-top: 0;
    width: 45vw;
    margin-left: 20px;
}

.shop-list .shop-item .center .shop-info {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.shop-list .shop-item .center .name {
    font-size: 16px;
    font-weight: bold;
}

.shop-list .shop-item .center .brand {
    display: inline-block;
    width: 30px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    background: #ffd930;
    margin-right: 12px;
    font-weight: bold;
    border-radius: 5px;
}

.shop-list .shop-item .center .rate {
    display: flex;
    font-size: 10px;
}

.shop-list .shop-item .center .score {
    color: #ff6000;
    margin: 0 8px;
}

.shop-list .shop-item .center .sale {
    color: #666;
}

.shop-list .shop-item .center .price {
    font-size: 10px;
    color: #666;
}

.shop-list .shop-item .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 55%;
    width: 80px;
    /* text-align: right; */
}

.shop-list .shop-item .right .promise {
    font-size: 10px;
    color: #666;
}

.shop-list .shop-item .right .promise span {
    border: 1px solid #f1f1f1;
    padding: 0.5px 1.5px;
}

.shop-list .shop-item .right .send {
    width: 54px;
    font-size: 10px;
    color: #02a774;
    border: 1px solid #02a774;
    padding: 2px 0;
    text-align: center;
}
</style>
