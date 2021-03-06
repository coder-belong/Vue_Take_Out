const sms_util = require('../../util/sms_util')

// 设置一个全局对象
global.users = {}


// 发送手机验证码的接口

module.exports = (req, res) => {
    //1. 获取请求参数数据
    var phone = req.query.phone;
    //2. 处理数据
    //生成验证码(6位随机数)
    var code = sms_util.randomCode(6);
    //发送给指定的手机号
    console.log(`向${phone}发送验证码短信: ${code}`);
    sms_util.sendCode(phone, code, function (success) {//success表示是否成功
        if (success) {
            global.users[phone] = code
            console.log('保存验证码: ', phone, code)
            res.send({ "code": 0 })
        } else {
            //3. 返回响应数据
            res.send({ "code": 1, msg: '短信验证码发送失败' })
        }
    })
}