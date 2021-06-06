const express = require('express')
const router = express.Router()
const User = require('../model/users')
const Cards = require('../model/goodsCard')
const Comment = require('../model/commentList')

router.post('/addcomment', (req, res) => {
    const { cardid, userid, content } = req.body
    Comment.create({ userid, content, cardid }, (err, data) => {
        if (err) {
            res.send(err)
        }
        Cards.findByIdAndUpdate(cardid, { $push: { comment: data._id } }, (err2, data2) => {
            res.send(data)
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
    Cards.findById(id)
        .populate('userid', 'name avatar _id')
        .exec((err, card) => {
            Comment.find({ cardid: card._id })
                .populate('userid', 'name avatar _id')
                .sort({ likesnum: -1 })
                .exec((err3, comments) => {
                    res.send({ card, comments })
                })
        })
})
module.exports = router