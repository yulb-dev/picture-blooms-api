const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/pictureblooms", { useNewUrlParser: true, useUnifiedTopology: true }).then(data => { console.log('数据库连接成功') });
