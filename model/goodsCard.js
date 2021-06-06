const mongoose = require('mongoose')

var goodsCardchema = new mongoose.Schema({
    userid: {   //作者id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {  //标题
        type: String,
        default: '测试'
    },
    imgsrc: {   //图片链接
        type: String,
        default: 'http://118.190.63.62:6060/img/userAvatar/5f3cd6df23d736051836f48e.jpg'
    },
    labels: {  //标签
        type: Array,
        default: ['标签1', '标签2']
    },
    content: {  //内容
        type: String,
        default: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
    },
    ctime: {     //创建时间
        type: Date,
        default: new Date()
    },
    notdel: {  //删除
        type: Boolean,
        default: true
    },
    likesnum: {   //点赞数量
        type: Number,
        default: 0
    },
    comment: { //评论
        type: Array,
        default: []
    }
})
//db.goods.find({class:{$elemMatch:{$eq:'精选'}}}) 查找数组中是否含有某个值
const GoodsCard = mongoose.model('GoodsCard', goodsCardchema, 'goodscard')

module.exports = GoodsCard
