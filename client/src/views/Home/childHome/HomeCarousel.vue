<template>
    <div id="home-carousel">
        <div class="swiper-container" v-show="swiperData.length > 0">
            <div class="swiper-wrapper">
                <div
                    class="swiper-slide"
                    v-for="(item1, index1) in swiperData"
                    :key="index1"
                >
                    <div class="swiper-content">
                        <div
                            class="item"
                            v-for="item2 in item1"
                            :key="item2.id"
                        >
                            <img :src="imgBaseURL + item2.image_url"  @load="imgLoad"/>
                            <p>{{ item2.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>

        <!-- 骨架图效果 -->
        <img
            src="../../../assets/img/msite_back.svg"
            alt=""
            v-show="swiperData.length === 0"
        />
    </div>
</template>

<script>
// 引入swiper插件
import 'swiper/swiper-bundle.min.css'
import Swiper from 'swiper/swiper-bundle.min.js'


export default {
    props: {
        swiperData: Array
    },

    data() {
        return {
            imgBaseURL: 'https://fuss10.elemecdn.com/'
        }
    },

    watch: {
        // 监听swiperData数据的更新，在初始化swiper
        // 坑：数据更新优先于界面更新，因此需要调用$nextTick初始化
        swiperData() {
            // 初始化swiper
            this.initSwiper()
        }
    },


    methods: {
        initSwiper() {
            this.$nextTick(() => {
                // 初始化swiper
                new Swiper('.swiper-container', {
                    loop: true,
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                    },
                })
            })
        },
        imgLoad() {
            this.$emit('imgLoad')
        }
    },



};
</script>

<style scoped>
.swiper-container {
    height: 200px;
    border-bottom: 15px solid rgb(245, 245, 245);
}
.swiper-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0;
}
.swiper-content .item {
    width: 24vw;
    text-align: center;
    margin-bottom: 20px;
}

.swiper-content .item img {
    width: 49px;
    height: 49px;
    margin-bottom: 5px;
}

.swiper-content .item p {
    font-size: 12px;
    color: #666666;
}

/* 轮播图的小圆点 */
#home-carousel >>> .swiper-pagination .swiper-pagination-bullet-active {
    background: rgb(1, 167, 116) !important;
}
</style>
