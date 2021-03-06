const md5 = require('blueimp-md5')

// 用户密码登录的接口
module.exports = (req, res) => {
    // 用户名
    const name = req.body.name
    // 密码
    const pwd = md5(req.body.pwd)
    // 图形验证码
    const captcha = req.body.captcha.toLowerCase()
    console.log('/login_pwd', name, pwd, captcha, global.right_captcha)


    // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
    if (captcha !== global.right_captcha) {
        return res.send({ code: 1, msg: '验证码不正确' })
    }
    // 清空保存的验证码
    global.captcha = ''

    UserModel.findOne({ name }, function (err, user) {
        if (user) {
            if (user.pwd !== pwd) {
                res.send({ code: 1, msg: '用户名或密码不正确!' })
            } else {
                // 登录成功的处理
                // 将user.id存储到全局对象中
                global.user_id = user._id
                setTimeout(() => {
                    global.user_id = ''  // 30秒后登陆状态失效
                }, 30000);
                res.send({ code: 0, data: { _id: user._id, name: user.name, phone: user.phone } })
            }
        } else {
            const userModel = new UserModel({ name, pwd })
            userModel.save(function (err, user) {
                // 将user.id存储到全局对象中
                global.user_id = user._id
                setTimeout(() => {
                    global.user_id = ''  // 30秒后登陆状态失效
                }, 30000);
                const data = { _id: user._id, name: user.name }
                // 3.2. 返回数据(新的user)
                res.send({ code: 0, data })
            })
        }
        console.log('/login_pwd', global.user_id);
    })
}