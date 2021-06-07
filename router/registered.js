const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const User = require('../model/users')
const Card = require('../model/goodsCard')
const fs = require('fs')
const path = require('path')
const images = require("images");
//当前服务器 ip 地址
const port = require('./port')

router.post('/', (req, res) => {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
        if (files.userAvatar) {
            //修改文件名字
            User.create({ name: fields.username, password: fields.password }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                else {
                    images(files.userAvatar.path)
                        .save(path.join(__dirname, '..', 'public', 'img', 'avatarcompress', data._id + '.jpg'), {
                            quality: 50
                        });
                    let avatar = port + '/img/avatarcompress/' + data._id + '.jpg'
                    let name = files.userAvatar.name.slice(files.userAvatar.name.lastIndexOf('.'))
                    User.findByIdAndUpdate(data._id, { avatar }, (err2, data2) => {
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

router.post('/setUp', (req, res) => {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
        const { name, gender, introduction, id } = fields
        const { userAvatar } = files
        if (userAvatar) {
            images(userAvatar.path)
                .save(path.join(__dirname, '..', 'public', 'img', 'avatarcompress', id + '.jpg'), {
                    quality: 50
                });
            let avatar = port + '/img/avatarcompress/' + id + '.jpg'
            let imgSuffix = userAvatar.name.slice(userAvatar.name.lastIndexOf('.'))
            User.findByIdAndUpdate(id, { name, gender, introduction, avatar }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                else {
                    // //创建可读流
                    var rs = fs.createReadStream(userAvatar.path)
                    // //创建可写流
                    var ws = fs.createWriteStream(path.join(__dirname, '..', 'public', 'img', 'userAvatar', id + imgSuffix))
                    // 可读流关闭的事件
                    rs.once('close', function () {
                        //当可读流关闭时，关闭可写流
                        ws.end()
                        res.send({ name, gender, introduction, avatar })
                    })
                    //读文件时会触发此事件
                    rs.on('data', function (filedata) {
                        //data：读到的数据
                        ws.write(filedata)
                    })
                }
            })
        }
        else {
            User.findByIdAndUpdate(id, { name, gender, introduction }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ name, gender, introduction, avatar: data.avatar })
                }
            })
        }
    })

})

router.post('/exit', (req, res) => {
    req.session.destroy()
    res.send(true)
})

router.post('/pushCard', (req, res) => {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
        if (files.img) {
            //修改文件名字
            let name = files.img.name.slice(files.img.name.lastIndexOf('.'))
            Card.create({ title: fields.title, labels: fields.labels.split(","), content: fields.content, userid: fields.userid }, (err, data) => {
                if (err) {
                    res.send(err)
                }
                else {
                    images(files.img.path)
                        .save(path.join(__dirname, '..', 'public', 'img', 'Compresspicture', data._id + '.jpg'), {
                            quality: 50
                        });
                    let imgsrc = port + '/img/Compresspicture/' + data._id + '.jpg'
                    Card.findByIdAndUpdate(data._id, { imgsrc }, (err2, data2) => {
                        if (err2) {
                            res.send(err2)
                        }
                        else {
                            // //创建可读流
                            var rs = fs.createReadStream(files.img.path)
                            // //创建可写流
                            var ws = fs.createWriteStream(path.join(__dirname, '..', 'public', 'img', 'cardImg', data2._id + name))
                            // 可读流关闭的事件
                            rs.once('close', function () {
                                //当可读流关闭时，关闭可写流
                                User.findByIdAndUpdate(fields.userid, { $push: { dynamic: { $each: [data2._id], $position: 0 } } }, (err3, data3) => {
                                    ws.end()
                                    res.send(data2._id)
                                })
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
            res.send({ keyValue: '出错了！' })
        }
    });
})

router.post('/goEdit', (req, res) => {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024 });
    form.parse(req, (err, fields, files) => {
        let { title, labels, content, cardid } = fields
        labels = labels.split(",")
        if (files.img) {
            images(files.img.path)
                .save(path.join(__dirname, '..', 'public', 'img', 'Compresspicture', cardid + '.jpg'), {
                    quality: 50
                });
            // let name = files.img.name.slice(files.img.name.lastIndexOf('.'))
        }
        Card.findByIdAndUpdate(cardid, { labels, title, content }, (err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send({})
                return
            }
        })
    });
})


module.exports = router