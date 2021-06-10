const express = require('express')
const router = express.Router()
const Label = require('../model/labels')
const Card = require('../model/goodsCard')
const User = require('../model/users')

router.get('/', (req, res) => {
    Card.aggregate([{ $match: { notdel: true } }, { $sample: { size: 6 } }])
        .exec((err, cardList) => {
            let arr = []
            for (let i = 0; i < cardList.length; i++) {
                arr[i] = cardList[i]._id
            }
            Card.find({ _id: { $in: arr } })
                .populate('userid', 'name avatar _id')
                .sort({ likesnum: -1 })
                .exec((err2, cardList) => {
                    Label.aggregate([{ $sample: { size: 10 } }, { $sort: { clicksnum: -1 } }])
                        .exec((err2, labelsList) => {
                            if (err) {
                                res.send(err)
                                return
                            }
                            res.send({ cardList, labelsList })
                        })
                })
        })
})

router.get('/getUser', (req, res) => {
    let { name } = req.query
    const regName = new RegExp(name)
    User.find({ name: regName })
        .sort({ fans: -1 })
        .exec((err, userList) => {
            if (err) {
                res.send(err)
                return
            }
            let labelsArr = name.split('，')
            if (name.indexOf(',') > -1) {
                labelsArr = name.split(',')
            }
            Card.find({ labels: { $all: labelsArr }, notdel: true })
                .populate('userid', 'name avatar _id')
                .sort({ likesnum: -1 })
                .exec((err2, cardList) => {
                    Card.find({
                        $or: [
                            { title: regName, notdel: true },
                            { content: regName, notdel: true },
                            { labels: { $all: labelsArr }, notdel: true }
                        ]
                    })
                        .populate('userid', 'name avatar _id')
                        .sort({ likesnum: -1 })
                        .exec((err3, articleList) => {
                            if (err3) {
                                res.send(err3)
                                return
                            }
                            res.send({ userList, cardList, articleList })
                        })
                })
        })
})

module.exports = router