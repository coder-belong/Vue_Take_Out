const ajax = require('../../api/ajax')

module.exports = (req, res) => {
    const { geohash, keyword } = req.query
    ajax('http://cangdu.org:8001/v4/restaurants', {
        'extras[]': 'restaurant_activity',
        geohash,
        keyword,
        type: 'search'
    }).then(data => {
        res.send({ code: 0, data })
    })
}