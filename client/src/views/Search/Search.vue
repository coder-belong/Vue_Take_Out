<template>
    <div id="search">
        <!-- 顶部导航条 -->
        <SearchNavBar />

        <!-- 搜索的表单区域 -->
        <div class="main">
            <div class="search-from">
                <div class="wrap">
                    <input
                        type="text"
                        @input="inputChange"
                        v-model="shopKey"
                        placeholder="请输入商家名称"
                    />
                    <i
                        class="iconfont icon-quxiao"
                        v-show="clearIconShow"
                        @click="clearClick"
                    ></i>
                </div>
                <button @click.prevent="searchClick">查找</button>
            </div>

            <p style="text-align: center">
                {{ showText ? "很抱歉！无搜索结果" : "" }}
            </p>

            <!-- 商家列表 -->
            <scroll class="scroll-wrap" ref="scrollWrap">
                <div class="shop-list" v-if="shopList.length > 0">
                    <div
                        class="item"
                        v-for="(item, index) in shopList"
                        :key="index"
                        @click="$router.replace('/shop')"
                    >
                        <div class="left">
                            <img
                                :src="imgBaseUrl + item.image_path"
                                width="50"
                                height="50"
                                @load="imgLoad"
                            />
                        </div>
                        <div class="right">
                            <div class="shop-name">{{ item.name }}</div>
                            <div class="shop-sell">
                                月售{{ item.recent_order_num }}单
                            </div>
                            <div class="send">
                                {{ item.float_minimum_order_amount }} 元起送 /
                                距离{{ item.distance }}
                            </div>
                        </div>
                    </div>
                </div>

                <br v-for="i in 10" :key="i" />
            </scroll>
        </div>
    </div>
</template>

<script>
import SearchNavBar from './childSearch/SearchNavBar'

import Scroll from '../../components/common/Scroll/Scroll'

import { searchShopList } from '../../network/home'


export default {
    name: 'search',
    components: {
        SearchNavBar,
        Scroll
    },
    data() {
        return {
            shopKey: '',  // 双向绑定的表单数据
            clearIconShow: false,  // 控制清空表单图标的显示与隐藏
            shopList: [],  // 查找的商家店铺列表
            imgBaseUrl: 'http://cangdu.org:8001/img/',
            showText: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.scrollWrap.scroll.refresh()
        })
    },
    methods: {
        // 监听表单的输入
        inputChange() {
            if (!this.shopKey) {
                this.clearIconShow = false
            } else {
                this.clearIconShow = true
            }
        },
        // 监听清空图标的点击
        clearClick() {
            this.shopKey = ''
            this.shopList = []
        },
        // 监听查找按钮的点击   
        searchClick() {
            let geohash = '40.10038,116.36867'
            this._searchShopList(geohash, this.shopKey)
        },

        // 监听图片的加载完成
        imgLoad() {
            this.$refs.scrollWrap.scroll.refresh()
        },

        // 根据经纬度和关键字发送网络请求，获取商家信息
        async _searchShopList(geohash, keyword) {
            let res = await searchShopList(geohash, keyword)
            this.shopList = res
            // 如果没有符合关键字的商家
            res.length === 0 ? this.showText = true : this.showText = false
        }
    },
};
</script>

<style scoped>
/* 主体区域 */
#search .main {
    position: relative;
    top: 44px;
}
/* 表单区域 */
#search .main .search-from {
    position: relative;
    z-index: 4;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #fff;
}

#search .main .search-from .wrap {
    position: relative;
}

#search .main .search-from .wrap .iconfont {
    position: absolute;
    top: 12px;
    right: 10px;
    font-size: 12px;
    color: black;
}

/* 清除移动端表单的默认样式 */
input {
  text-indent: 0;
  background: transparent;
  border: 0 none;
  resize: none;
  outline: none; /*清除选中效果的默认蓝色边框 */
  -webkit-appearance: none; /*清除浏览器默认的样式 */
  line-height: normal;
}

#search .main .search-from input {
    width: 250px;
    height: 35px;
    background-color: rgb(242, 242, 242);
    border-radius: 7px;
    padding-left: 15px;
    transition: box-shadow 0.3s;
}

#search .main .search-from input::placeholder {
    font-size: 12px;
}

#search .main .search-from input:focus {
    box-shadow: 0 0 5px #02a774;
    outline: none;
}

#search .main .search-from button {
    width: 65px;
    height: 35px;
    outline: none;
    border: none;
    background-color: rgb(2, 167, 116);
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 7px;
}

/* 商家列表 */
.shop-list {
    padding-top: 7px;
}
/* 滚动区域 */
.scroll-wrap {
    position: fixed;
    width: 100vw;
    height: calc(100vh - 44px - 55px);
}

.shop-list .item {
    display: flex;
    font-size: 12px;
    height: 71px;
    align-items: center;
    border-bottom: 1px solid #eaeaea;
    padding-left: 15px;
}
.shop-list .item .left {
    margin-right: 20px;
}

.shop-list .item .right {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
