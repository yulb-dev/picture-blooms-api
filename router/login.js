const express = require('express')
const router = express.Router()
const User = require('../model/users')

router.post('/', (req, res) => {
    User.findOne(req.body, (err, data) => {
        if (err) {
            res.send(err)
        }
        if (data) {
            req.session.userid = data._id
        }
        res.send(data)
    })

})
module.exports = router