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

router.post('/addfavorite', (req, res) => {
    const { cardid, userid } = req.body
    User.findByIdAndUpdate(userid, { $push: { favorites: cardid } }, (err, data) => {
        if (err) {
            res.send(err)
        }
        Cards.findByIdAndUpdate(cardid, { $inc: { likesnum: 1 } }, (err2, data2) => {
            res.send({})
        })
    })

})

router.get('/getMessage', (req, res) => {
    const { id } = req.query
    Cards.findById(id, (err, data) => {
        if (data) {
            User.findById(data.userid, (err2, data2) => {
                if (data2) {
                    const { title, imgsrc, labels, content, ctime, likesnum, comment, _id, userid, notdel } = data

                    let cardMessage = { notdel, title, imgsrc, labels, content, ctime, likesnum, comment, _id, userid, useravatar: data2.avatar, username: data2.name }
                    res.send(cardMessage)
                }
                else {
                    res.send(null)
                    return
                }
            })
        }
        else {
            res.send(null)
        }
    })

})
module.exports = router