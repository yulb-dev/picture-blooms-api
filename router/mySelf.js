const express = require('express')
const router = express.Router()
const User = require('../model/users')
const GoodsCard = require('../model/goodsCard')

router.get('/', (req, res) => {
    if (req.session.userid) {
        User.findById(req.session.userid, (err, data) => {
            if (err) {
                res.send(err)
            }
            res.send(data)
        })
    }
    else
        res.send(null)

})

router.get('/getCard', (req, res) => {
    GoodsCard.findById(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data)
    })

})

router.get('/delFavorite', (req, res) => {
    User.findByIdAndUpdate(req.query.userid, { $pull: { favorites: req.query.cardid } }, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data)
    })

})

//获取我的动态中的卡片信息
router.get('/dynamic', (req, res) => {
    GoodsCard.findById(req.query.id, (err, data) => {
        res.send(data)
    })
})
//获取我的关注中的用户信息
router.get('/idol', (req, res) => {
    User.findById(req.query.id, (err, data) => {
        res.send(data)
    })
})

module.exports = router