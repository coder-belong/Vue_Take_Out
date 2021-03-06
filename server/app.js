var express = require('express');
var logger = require('morgan');  //  展示网络请求的相关信息
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var index = require('./routes/index');

var app = express();

// 配置session
app.use(cookieParser());
app.use(session({
	name: 'userid',
	secret: '12345',
	cookie: {
		maxAge: 1000 * 300, // 设置maxAge是5分钟 服务器重启后session会失效，没有做持久化
		secure: true
	},
	resave: true,
	saveUninitialized: true,
}));


// 后端解决跨域
const cors = require('cors')
app.use(cors())



// 测试接口
app.use('/test', (req, res) => {
	// 通过global全局对象模拟cookie
	global.mock_cookie = {
		username: 'peiqi',
		maxAge: 1000 * 10
	}
	// 通过定时器来让模拟的cookie失效
	setTimeout(() => {
		global.mock_cookie = ''
		console.log('cookie已失效', global.mock_cookie);
	}, global.mock_cookie.maxAge);

	console.log(global.mock_cookie);
	res.send('这是一个测试接口')
})

// 输出网络请求信息
app.use(logger('dev'));
// 配置body请求体参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', index);

// 监听端口号
app.listen(8887, () => console.log('硅谷外卖接口启动成功,端口号是8887'))

