const routerHome = require('./home')

//导出
module.exports = function (app) {
    app.use('/home', routerHome)
}