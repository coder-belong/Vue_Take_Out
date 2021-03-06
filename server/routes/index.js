var express = require('express');
var router = express.Router();

const models = require('../db/models')



// ------------------------- 登录注册相关的接口 ---------------------------------

// 获取一次性图形验证码
router.get('/captcha', require('./code/captcha'));

// 发送手机验证码
router.get('/sendcode', require('./code/phone_code'))

// 密码登陆
router.post('/login_pwd', require('./login/login_pwd'))

// 短信登陆
router.post('/login_sms', require('./login/login_sms'))

// 根据sesion中的userid, 查询对应的user
router.get('/userinfo', require('./login/userInfo'))

// 退出登录的接口
router.get('/logout', require('./login/login_out'))


// ------------------------ 商家店铺相关的接口 -----------------------------
// 根据经纬度获取位置详情
router.get('/position/:geohash', require('./home/position'))

// 获取首页分类列表
router.get('/index_category', require('./home/category'))

// 根据经纬度获取商铺列表
router.get('/shops', require('./home/shopList'))

// 店铺搜索接口
router.get('/search_shops', require('./home/search_shop'))

module.exports = router;