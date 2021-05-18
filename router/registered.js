const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const User = require('../model/users')
const fs = require('fs')
const path = require('path')
//当前服务器 ip 地址
const port = require('./port')

router.post('/', (req, res) => {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
        if (files.userAvatar) {
            //修改文件名字
            let name = files.userAvatar.name.slice(files.userAvatar.name.lastIndexOf('.'))
            User.create({ name: fields.username, password: fields.password }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                else {
                    let avatar = port + '/img/userAvatar/' + data._id + name
                    User.findByIdAndUpdate(data._id, { avatar: avatar }, (err2, data2) => {
                        if (err2) {
                            res.send(err2)
                        }
                        else {
                            data.avatar = avatar
                            // //创建可读流
                            var rs = fs.createReadStream(files.userAvatar.path)
                            // //创建可写流
                            var ws = fs.createWriteStream(path.join(__dirname, '..', 'public', 'img', 'userAvatar', data2._id + name))
                            // 可读流关闭的事件
                            rs.once('close', function () {
                                //当可读流关闭时，关闭可写流
                                ws.end()
                                req.session.userid = data._id
                                res.send(data)
                            })
                            //读文件时会触发此事件
                            rs.on('data', function (filedata) {
                                //data：读到的数据
                                ws.write(filedata)
                            })
                        }
                    })

                }
            })

        }
        else {
            User.create({ name: fields.username, password: fields.password }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                else {
                    req.session.userid = data._id
                    res.send(data)
                }
            })
        }

    });

})

module.exports = router