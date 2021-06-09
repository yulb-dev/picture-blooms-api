const express = require('express')
const router = express.Router()
const Card = require('../model/goodsCard')
const User = require('../model/users')
const Labels = require('../model/labels')

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

router.get('/getLabelsInfo', (req, res) => {
    const { labels } = req.query
    Labels.findOneAndUpdate({ value: labels }, { $inc: { clicksnum: 1 } }, (err, data) => {
        //用户点击标签，增加点击数
        if (err) {
            return
        }
    })
    Card.find({ labels: { $elemMatch: { $eq: req.query.labels } }, notdel: true })
        .populate('userid', "name avatar")
        .sort({ likesnum: -1 })
        .exec((err, data) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(data)
        })
})

module.exports = router