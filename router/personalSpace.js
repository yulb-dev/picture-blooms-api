const express = require('express')
const router = express.Router()
const Card = require('../model/goodsCard')
const User = require('../model/users')

router.get('/', (req, res) => {
    User.findById(req.query.id, (err, user) => {
        if (err) {
            res.send(err)
            return
        }
        Card.find({ userid: user._id, notdel: true })
            .sort({ ctime: -1 })
            .exec(function (err2, dynamicList) {
                if (err2) {
                    res.send(err2)
                    return
                }
                res.send({ user, dynamicList })
            })
    })
})
module.exports = router