const express = require('express')
const router = express.Router()
const User = require('../model/users')
const Cards = require('../model/goodsCard')
const Comment = require('../model/commentList')

router.post('/addcomment', (req, res) => {
    const { cardid, userid, content } = req.body
    Comment.create({ userid, content }, (err, data) => {
        if (err) {
            res.send(err)
        }
        Cards.findByIdAndUpdate(cardid, { $push: { comment: data._id } }, (err2, data2) => {
            res.send(data._id)
        })
    })
})

router.get('/getcomment', (req, res) => {
    Comment.findById(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
        }
        User.findById(data.userid, (err2, data2) => {
            const { avatar, name } = data2
            const { _id, ctime, likesnum, content, userid } = data
            res.send({ _id, ctime, likesnum, content, userid, avatar, name })
        })
    })
})
module.exports = router