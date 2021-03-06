<template>
    <div id="login">
        <i class="iconfont icon-back-line" @click="backClick"></i>
        <!-- 主题区域 -->
        <section>
            <h3>硅谷外卖</h3>

            <!-- 登录方式 -->
            <div class="login-methods">
                <!-- 短信登录 -->
                <div
                    class="note-login"
                    :class="{ active: loginWay }"
                    @click="loginWayClick('note')"
                >
                    短信登录
                </div>

                <!-- 密码登录 -->
                <div
                    class="pwd-login"
                    :class="{ active: !loginWay }"
                    @click="loginWayClick('pwd')"
                >
                    密码登录
                </div>
            </div>

            <!-- 登录区域 -->
            <div class="login-content">
                <!-- 短信登录区域 -->
                <form action="#" class="note-login-content" v-show="loginWay">
                    <!-- 手机号 -->
                    <div class="phone">
                        <input
                            type="text"
                            placeholder="手机号"
                            @input="phoneChange"
                            v-model="phoneNumber"
                        />
                        <!-- 获取验证码 -->
                        <button
                            class="get-code"
                            :disabled="!FromVerify.phone"
                            @click.prevent="sendCode"
                        >
                            {{
                                computeTime
                                    ? `已发送(${this.computeTime})秒`
                                    : "获取验证码"
                            }}
                        </button>
                    </div>

                    <!-- 短信验证码 -->
                    <input
                        type="text"
                        placeholder="短信验证码"
                        v-model="FromVerify.code"
                    />

                    <!-- 提示 -->
                    <p class="tip">
                        温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                        <a style="color: green">《用户服务协议》</a>
                    </p>

                    <button @click.prevent="fromSubmit">注册</button>

                    <p class="about">关于我们</p>
                </form>

                <!-- 密码登录区域 -->
                <form action="#" class="pwd-login-content" v-show="!loginWay">
                    <!-- 用户账号 -->
                    <input
                        type="text"
                        placeholder="手机 / 邮箱 / 用户名"
                        v-model="FromVerify.username"
                    />

                    <!-- 密码 -->
                    <div class="pwd">
                        <input
                            :type="pwdVisible ? 'text' : 'password'"
                            placeholder="密码"
                            v-model="FromVerify.password"
                        />
                        <div class="icon" @click="showPwd">
                            <i
                                class="iconfont icon-Group_d"
                                v-show="!pwdVisible"
                            ></i>
                            <i
                                class="iconfont icon-xianshi"
                                v-show="pwdVisible"
                            ></i>
                        </div>
                    </div>

                    <!-- 图形验证码 -->
                    <div class="captcha">
                        <input
                            type="text"
                            placeholder="验证码"
                            v-model="FromVerify.captcha"
                        />

                        <img
                            src="http://timecrush.cn:8887/captcha"
                            @click="captChaClick"
                            ref="captCha"
                        />
                    </div>

                    <button @click.prevent="fromSubmit">登录</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
// 引入Mint-UI组件库 中的弹窗
import { MessageBox, Toast } from 'mint-ui'

import {
    sendPhoneCode,
    login_pwd,
    login_sms
} from "../../network/login"

export default {
    name: 'login',
    data() {
        return {
            loginWay: true, // 控制登录方式的展示，默认为短信登录
            phoneNumber: "1885045441", // 双向绑定手机号
            computeTime: 0, // 计时时间
            pwdVisible: false,  // 控制密码的展示，默认不密码不可见

            FromVerify: { // 表单数据双向绑定  
                phone: "", // 手机号码  当为true时 才合法
                code: '',  // 短信验证码
                username: '',  // 用户名
                password: '',  // 用户密码
                captcha: '',  // 图形验证码
            },

        };
    },

    mounted() {
    },
    methods: {
        /**
         * 事件监听相关
         */

        // 监听返回的点击
        backClick() {
            // 返回上一级路由
            this.$router.go(-1); //返回上一层
        },

        // 监听登录方式的切换
        loginWayClick(way) {
            if (way === "note") {
                this.loginWay = true;
            } else {
                this.loginWay = false;
            }
        },

        // 监听手机表单的改变
        phoneChange() {
            if (this.phoneNumber.length == 11) {
                this.FromVerify.phone = true;
            } else {
                this.FromVerify.phone = false;
            }
        },

        // 监听获取短信验证码的点击
        async sendCode() {
            // 如果当前没有开启定时器
            if (this.computeTime === 0) {
                this.computeTime = 30

                // 启动计时器 （倒计时效果）
                let timerID = setInterval(() => {
                    this.computeTime--

                    // 停止计时器
                    if (this.computeTime <= 0) {
                        clearInterval(timerID)
                    }
                }, 1000);

                // 发送网络请求
                let res = await sendPhoneCode(this.phoneNumber)
                if (res.code === 1) {
                    // code === 1 说明 该手机号码不在权限范围之内，无法发送验证码
                    MessageBox('提示', res.msg)

                    // 停止定时器
                    clearInterval(timerID)
                    // 重置计时器
                    this.computeTime = 0
                }
            }
        },

        // 监听密码的展示图标点击
        showPwd() {
            this.pwdVisible = !this.pwdVisible
        },

        // 表单提交
        async fromSubmit() {
            if (this.loginWay) {   // 短信登录方式
                // 前台校验表单
                if (!this.FromVerify.phone) {
                    return MessageBox('提示', '请输入合法的手机号')
                } else if (!this.FromVerify.code) {
                    return MessageBox('提示', '请输入短信验证码')
                }

                // 携带手机号码和短信验证码发送网络请求
                let res = await login_sms(this.phoneNumber, this.FromVerify.code)
                // console.log(res);
                if (res.code === 1) {  // code === 1：登录/注册失败
                    return MessageBox('提示', res.msg)
                }

                // --------- 以下是网络请求发送成功的后续处理 --------- 

                // 1. 将用户数据存储到Vuex下 通过mutations方式提交
                this.$store.commit('updateUserInfo', { id: res._id, phone: res.phone })
                // 2. 吐司弹窗
                Toast({
                    message: '登录成功',
                    duration: 1200
                })
                setTimeout(() => {
                    // 3. 跳转到上一级页面
                    this.$router.back()
                }, 1500);
            }

            if (!this.loginWay) {   // 密码登录方式
                if (!this.FromVerify.username) {
                    return MessageBox('提示', '请输入用户名')
                } else if (!this.FromVerify.password) {
                    return MessageBox('提示', '请输入密码')
                } else if (!this.FromVerify.captcha) {
                    return MessageBox('提示', '请输入图形验证码')
                }

                // 携带用户名、密码、图形验证码发送网路请求
                let res = await login_pwd(this.FromVerify.username, this.FromVerify.password, this.FromVerify.captcha)
                // console.log(res);
                if (res.code === 1) {  // 验证码错误
                    this.captChaClick()  // 重置图形验证码
                    return MessageBox('提示', res.msg)
                }
                // console.log(res);

                // --------- 以下是网络请求发送成功的后续处理 --------- 

                // 1. 将用户数据存储到Vuex下 通过mutations方式提交
                this.$store.commit('updateUserInfo', { id: res._id, phone: res.name })
                // 2. 吐司弹窗
                Toast({
                    message: '登录成功',
                    duration: 1200
                })
                setTimeout(() => {
                    // 3. 跳转到上一级页面
                    this.$router.back()
                }, 1500);
            }
        },

        // 图形验证码的点击
        captChaClick() {
            this.$refs.captCha.src = 'http://192.168.2.150:4000/captcha?time' + Date.now()
        },
    },
};
</script>

<style src='./css/index.css' scoped></style>