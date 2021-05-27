const express = require('express')
const router = express.Router()
const GoodsCard = require('../model/goodsCard')
const User = require('../model/users')

router.get('/cardList', (req, res) => {
    GoodsCard.find().limit(parseInt(req.query.page) * 6).then(data => {
        res.send(data)
    })

})

//刷新页面
router.get('/isRefresh', (req, res) => {
    GoodsCard.aggregate([{ $sample: { size: 6 } }], (err, data) => {
        if (err) {
            res.send('出错了')
        }
        res.send(data)
    })
})

router.get('/userMessage', (req, res) => {
    User.findById(req.query.id, (err, data) => {
        res.send({ avatar: data.avatar, username: data.name })
    })
})


// router.get('/', (req, res) => {
//     GoodsCard.create({ userid: '123' }, (err, data) => {
//         if (err) {
//             console.log(err)
//         }
//         res.send(data)
//     })

// })

module.exports = router