const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    userid: {   //谁评论的
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cardid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GoodsCard'
    },
    content: {  //内容
        type: String,
    },
    ctime: {     //创建时间
        type: Date,
        default: new Date()
    },
    likesnum: {   //点赞数量
        type: Number,
        default: 0
    },
})
//db.goods.find({class:{$elemMatch:{$eq:'精选'}}}) 查找数组中是否含有某个值
const Comment = mongoose.model('CommentSchema', commentSchema, 'comment')

module.exports = Comment
