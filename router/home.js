const express = require('express')
const router = express.Router()
const GoodsCard = require('../model/goodsCard')
const User = require('../model/users')

router.get('/cardList', (req, res) => {
    GoodsCard.aggregate([
        { $match: { notdel: true } },
        { $sample: { size: parseInt(req.query.page) * 6 } }
    ], (err, data) => {
        if (err) {
            res.send('出错了')
        }
        res.send(data)
    })

})

//刷新页面
router.get('/isRefresh', (req, res) => {
    GoodsCard.aggregate([
        { $match: { notdel: true } },
        { $sample: { size: 6 } }
    ], (err, data) => {
        if (err) {
            res.send('出错了')
        }
        res.send(data)
    })
})

router.get('/userMessage', (req, res) => {
    User.findById(req.query.id, (err, data) => {
        if (data)
            res.send({ useravatar: data.avatar, username: data.name })
        else
            res.send(null)
    })
})

module.exports = router