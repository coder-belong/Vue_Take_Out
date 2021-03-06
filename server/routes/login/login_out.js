module.exports = (req, res) => {
    // 清除global保存的userid
    global.user_id = ''
    // 返回数据
    res.send({ code: 0 })
}