/**
 * 基于axios的二次封装
 */

import axios from 'axios'

//导入进度条插件
import NProgress from 'nprogress'
//导入进度条样式
import 'nprogress/nprogress.css'

function myaxios(opations) {
    const instance = axios.create({
        baseURL: 'http://timecrush.cn:8887',
        
        // 坑：URL必须写服务器主机的IPV4地址，否则移动端访问不到接口
        // baseURL: 'http://192.168.2.150:4000',
        // baseURL: 'http://127.0.0.1:4000',

        timeout: 999999,
    })

    // 请求拦截器
    instance.interceptors.request.use(config => {
        NProgress.start()
        return config
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
        NProgress.done()
        return res.data.data || res.data
    })
    // 返回Promise对象
    return instance(opations)
}



export default myaxios