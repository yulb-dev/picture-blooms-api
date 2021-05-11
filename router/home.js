const express = require('express')
const router = express.Router()
const GoodsCard = require('../model/goodsCard')

router.get('/cardList', (req, res) => {
    GoodsCard.find().limit(parseInt(req.query.page) * 6).then(data => {
        res.send(data)
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