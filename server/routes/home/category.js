module.exports = (req, res) => {
    setTimeout(function () {
        const data = require('../../data/index_category.json')
        res.send({ code: 0, data })
    }, 300)
}