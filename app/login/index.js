(function() {
   var app = require('express')()
   app.locals.pretty = true
   app.set('views', __dirname)

   var controller = require('./login_controller')()

   app.get('/login', controller.form)
   app.post('/login', controller.login)

   module.exports = app
})()
