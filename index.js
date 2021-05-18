const express = require('express')
const app = express()
const router = require('./router/router')
const session = require('express-session')

//处理跨域问题
app.all('*', (req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'credentials,Content-Type, Content-Length, Authorization, Accept, X-Requested-With, token',
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS"
    });
    next();
})

//配置session
app.use(session({
    secret: 'usermessage',  //一个 String 类型的字符串，作为服务器端生成 session 的签名。
    resave: false,           //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
    cookie: { maxAge: 3600000 },//设置返回到前端 key 的属性，默认值为
    saveUninitialized: false, //强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于
}))

//开启数据库服务
require('./model/connectDatabase')


//静态资源
app.use("/img", express.static("./public/img"));

//解析 body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//挂载路由
router(app)

app.listen(6060, function () {
    console.log("通过6060访问...")
})
