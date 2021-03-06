module.exports = {
    // / webpack-dev-server 相关配置
    devServer: {  
        // 前端解决跨域
        proxy: {
            '/api': { //使用"/api"来代替"真实地址" 
                target: 'http://192.168.2.150:3000',   // 设置你调用的接口地址和端口号，别忘了加http
                changeOrigin: true,// 改变源 
                pathRewrite: {
                    // 这里理解成用`/api`代码target里面的地址，在前端发送网络请求时直接用`/api`代替原来的接口地址
                    '^/api/': ''
                }
            }
        }
    }
}
