(function() {
   var app = require('express')()
   var controller = require('./main_controller')()
   var passport = require('passport')

   app.locals.pretty = true
   app.set('views', __dirname)

   app.get('/', controller.index)

   module.exports = app
})()
