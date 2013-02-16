(function() {
   var app = require('express')()
   var passport = require('passport')
   app.locals.pretty = true
   app.set('views', __dirname)

   var controller = require('./login_controller')()

   app.get('/login', controller.form)
   app.post('/login', passport.authenticate('local', {
         failureRedirect: '/login',
         successRedirect: '/'
      }))

   module.exports = app
})()
