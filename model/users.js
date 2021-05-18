const mongoose = require('mongoose')
const port = require('../router/port')

var users = new mongoose.Schema({
    name: {   //作者名
        type: String,
        unique: true
    },
    password: { //用户密码
        type: String,
    },
    avatar: {  //作者头像
        type: String,
        default: port + '/img/userAvatar/avatar.png'
    },
    introduction: {  //个人简介
        type: String,
        default: '这个人很懒，什么都没写'
    },
    gender: {  //性别
        type: Number,
        default: 2
    },
    email: {  //邮箱
        type: String,
    },
    favorites: {   //收藏
        type: Array,
        default: []
    },
    idol: {  //关注
        type: Array,
        default: []
    },
    fans: {  //粉丝
        type: Array,
        default: []
    },
    notes: {  //便签
        type: Array,
        default: []
    },
    dynamic: {  //动态
        type: Array,
        default: []
    },
    ctime: {     //创建时间
        type: Date,
        default: new Date()
    },
})

const User = mongoose.model('User', users, 'user')

module.exports = User
