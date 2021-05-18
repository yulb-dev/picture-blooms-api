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
module.exports = router