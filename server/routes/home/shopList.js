module.exports = (req, res) => {
    const latitude = req.query.latitude
    const longitude = req.query.longitude

    setTimeout(function () {
        const data = require('../../data/shops.json')
        res.send({ code: 0, data })
    }, 300)
}