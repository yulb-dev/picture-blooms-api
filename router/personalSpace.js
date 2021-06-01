const express = require('express')
const router = express.Router()
const User = require('../model/users')

router.get('/', (req, res) => {
    User.findById(req.query.id, (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        res.send(data)
    })

})
module.exports = router