const routerHome = require('./home')
const mySelf = require('./mySelf')
const registered = require('./registered')
const login = require('./login')
const details = require('./details')

//导出
module.exports = function (app) {
    app.use('/home', routerHome)
    app.use('/mySelf', mySelf)
    app.use('/registered', registered)
    app.use('/login', login)
    app.use('/details', details)
}