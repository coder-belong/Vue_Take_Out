const _filter = { 'pwd': 0, '__v': 0 } // 查询时过滤掉

// 根据global存储的user_id查询用户数据的接口
module.exports = (req, res) => {
    console.log('/userinfo', global.user_id);
    // 取出userid
    const { user_id } = global
    // 查询
    UserModel.findOne({ _id: user_id }, _filter, function (err, user) {
        // 如果没有, 返回错误提示
        if (!user) {
            // 清除global保存的userid
            global.user_id = ''

            res.send({ code: 1, msg: '请先登陆' })
        } else {
            // 如果有, 返回user
            res.send({ code: 0, data: user })
        }
    })
}