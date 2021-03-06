const models = require('../../db/models')
const UserModel = models.getModel('user')


// 手机短信登录的接口
module.exports = (req, res) => {
    var phone = req.body.phone; // 手机号码
    var code = req.body.code;  // 短信验证码
    console.log('/login_sms', phone, code);
    if (global.users[phone] != code) {
        res.send({ code: 1, msg: '手机号或验证码不正确' });
        return;
    }
    //删除保存的code
    delete global.users[phone];

    UserModel.findOne({ phone }, function (err, user) {
        if (user) {  // 判断该手机号码是否存在
            // 将user.id存储到全局对象中
            global.user_id = user._id
            setTimeout(() => {
                global.user_id = ''  // 10秒后登陆状态失效
            }, 30000);
            res.send({ code: 0, data: user })

        } else {
            //存储数据
            const userModel = new UserModel({ phone })
            userModel.save(function (err, user) {
                // 将user.id存储到全局对象中
                global.user_id = user._id
                setTimeout(() => {
                    global.user_id = ''  // 10秒后登陆状态失效
                }, 30000);
                res.send({ code: 0, data: user })
            })
        }
        console.log('/login_sms', global.user_id);
    })
}