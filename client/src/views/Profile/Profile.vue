<template>
    <div class="profile">
        <nav-bar>
            <span slot="center">个人中心</span>
        </nav-bar>
        <!-- 个人中心 -->
        <scroll class="scroll-wrap" ref="scroll">
            <section class="jq22-flexView">
                <section class="jq22-scrollView">
                    <div class="jq22-take-head">
                        <div class="jq22-flex jq22-flex-one">
                            <div class="jq22-take-user">
                                <img src="./img/user.png" />
                            </div>
                            <h3
                                style="color: white"
                                @click="login"
                                v-show="!$store.state.userInfo.id"
                            >
                                请登录
                            </h3>
                            <div
                                class="jq22-flex-box"
                                v-show="$store.state.userInfo.id"
                            >
                                <h2>猫叔</h2>
                                <span>
                                    <i class="icon icon-phone"></i>188****5045
                                </span>
                            </div>
                            <div class="jq22-take-button">
                                <button>
                                    <i class="icon icon-pic"></i>签到领积分
                                </button>
                            </div>
                        </div>
                        <div class="jq22-flex jq22-flex-two">
                            <div class="jq22-flex-box">
                                <h3>每天领红包，年卡仅0.12元/天</h3>
                            </div>
                            <div class="jq22-go-button">
                                <button>立即开通</button>
                            </div>
                        </div>

                        <img src="./img/1.png" alt="" />
                    </div>

                    <div class="jq22-flex jq22-flex-three">
                        <div class="jq22-flex-box jq22-flex-box-info">
                            <h4>优惠券 <em>0</em>张</h4>
                        </div>
                        <div class="jq22-flex-box">
                            <h4>积分 <em>0</em>分</h4>
                        </div>
                    </div>

                    <div class="jq22-take-item">
                        <div class="jq22-flex" style="padding-bottom: 0">
                            <div class="jq22-flex-box">
                                <h1>我的订单</h1>
                            </div>
                            <div class="jq22-arrow">
                                <span>查看全部订单</span>
                            </div>
                        </div>
                        <div class="jq22-palace">
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-001.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>待支付</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-002.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>待收货</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-003.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>待评价</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-004.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>售后</h2>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="jq22-flex jq22-flex-fore">
                        <div class="jq22-flex-box">
                            <img src="./img/test.png" alt="" />
                        </div>
                    </div>

                    <div class="jq22-take-item">
                        <div class="jq22-flex">
                            <div class="jq22-flex-box">
                                <h1>常用功能</h1>
                            </div>
                        </div>
                        <div class="jq22-palace">
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-005.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>我的绿卡</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-006.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>收货地址</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-007.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>邀请有礼</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-008.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>联系客服</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-009.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>礼品卡</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-010.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>扫一扫</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-011.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>意见反馈</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-012.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>设置</h2>
                                </div>
                            </a>
                            <a href="javascript:;" class="jq22-palace-grid">
                                <div class="jq22-palace-grid-icon">
                                    <img src="./img/nav-013.png" alt="" />
                                </div>
                                <div class="jq22-palace-grid-text">
                                    <h2>企业采购</h2>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div
                        class="login_out"
                        @click="loginOut"
                        v-show="$store.state.userInfo.id"
                    >
                        <mt-button type="danger">退出登录</mt-button>
                    </div>
                    <div style="height: 50px"></div>
                </section>
            </section>
            <br v-for="i in 19" :key="i" />
        </scroll>
    </div>
</template>

<script>
import NavBar from '../../components/content/NavBar/NavBar'
import Scroll from '../../components/common/Scroll/Scroll'

import { MessageBox, Toast } from 'mint-ui';

import { login_out } from '../../network/login.js'

export default {
    components: {
        NavBar,
        Scroll
    },
    mounted() {
        let img = document.querySelectorAll('img')
        img.forEach(val => {
            this.$refs.scroll.scroll.refresh()
        })
        
    },
    
    methods: {
        // 跳转路由
        login() {
            this.$router.replace('/login')
        },

        // 监听退出登录的按钮点击
        loginOut() {
            // 对话框
            MessageBox.confirm('确定退出当前账户?')
                .then(res => {
                    // 1. 发送网络请求清空后端用户登录数据
                    login_out()
                    // 2. 清空Vuex中的userInfo数据
                    this.$store.commit('updateUserInfo', {})

                    // 3. 吐司弹窗
                    Toast({
                        message: '退出成功',
                        duration: 1000
                    })
                })
                .catch(err => {
                    // 吐司弹窗
                    Toast({
                        message: '取消操作成功',
                        duration: 1000
                    })
                })
        }
    },
};
</script>

<style src="./css/index.css" scoped>
</style>
