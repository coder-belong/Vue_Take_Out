# 项目介绍

- client 硅谷外卖前台

- server 硅谷外卖后台

- test  接口测试

    

## 技术参考

### 前台

- axios
- better-scroll
- mint-ui
- mockjs
- moment
- swiper
- vue2.5
- vue-lazyload
- vue-router
- vuex

### 后台

- node
- mongoose
- express
- js-base64
- svg-captcha

### 测试

- postman



## 项目运行

### 安装依赖

1. 前后台安装相应依赖

```
npm install
```



### 启动后台项目

1. 安装`mongoDB`数据库并成功启动
    - MongoDB可视化工具：`Navicat Premium 15`
2. 安装 `Node`运行环境
3. 导入集合：`data -> .json文件`
4. 修改要连接的数据库：`db -> models.js`

```js
//  take_out为要连接的数据库名
mongoose.connect('mongodb://localhost:27017/take_out')
```

5. 启动后台项目：`npm start`

6. 修改发送短信验证SID 短信验证官网:[容联云通讯](https://www.yuntongxun.com/?ly=sem-baidu&qd=pc-dasou&cp=ppc&xl=null&kw=10236399&bd_vid=10788411988454829498)
    - 注册登录以后,控制台首页有开发者主账号,复制四条秘钥进行修改

```js
// --util -> sum_userInfo.js
var ACCOUNT_SID = '填入你的SID';
var AUTH_TOKEN = '填入你的TOKEN';
var Rest_URL = 'https://app.cloopen.com:8883';
var AppID = '8aaf0708697b6beb016985281c8103f4';
```

7. 修改服务器端口号

```js
// --app.js
app.listent(4000)
```



###启动前台项目

```
npm start
```

前台登录注册功能是一起的,也就是登录时后台判断是否有此账号,没有进行注册再登录,返回登录成功信息