var svgCaptcha = require('svg-captcha')

// 获取图形验证码的接口
module.exports = (req, res) => {
    var captcha = svgCaptcha.create({
        ignoreChars: '0o1l',
        noise: 2,
        color: true
    });
    // 存储图形验证码 （全局存储）
    global.right_captcha = captcha.text.toLowerCase();
    console.log(right_captcha);
    /*res.type('svg');
    res.status(200).send(captcha.data);*/
    res.type('svg');
    res.send(captcha.data)
}