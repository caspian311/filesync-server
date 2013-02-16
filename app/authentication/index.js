(function() {
   var passport = require('passport')
   var passport_local = require('passport-local')
   var app = require('express')()

   var authenticate_request = require('./authenticate_request')
   var login_validator = require('./login_validator')()
   var user_serialization = require('./user_serialization')()

   app.use(passport.initialize())
   app.use(passport.session())

   passport.serializeUser(user_serialization.serialize)
   passport.deserializeUser(user_serialization.deserialize)

   passport.use(new passport_local.Strategy(login_validator.validate_login))
   app.use(authenticate_request)

   module.exports = app
})()
