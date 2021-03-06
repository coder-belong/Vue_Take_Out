import myaxios from './network'

// 发送手机短信验证码
function sendPhoneCode(phone) {
    return myaxios({
        url: '/sendcode',
        params: {
            phone
        }
    })
}

// 用户密码登录
function login_pwd(name, pwd, captcha) {
    return myaxios({
        url: '/login_pwd',
        method: 'post',
        data: {
            name,
            pwd,
            captcha
        }
    })
}

// 手机验证码登录
function login_sms(phone, code) {
    return myaxios({
        url: '/login_sms',
        method: 'post',
        data: {
            phone,
            code
        }
    })
}

// 后端根据session获取用户数据 （实现登录后保持会话状态）
function autoLogin() {
    return myaxios({
        url: '/userinfo',
    })
}

// 退出登录
function login_out() {
    return myaxios({
        url: '/logout',
    })
}

export {
    sendPhoneCode,
    login_pwd,
    login_sms,
    autoLogin,
    login_out
}