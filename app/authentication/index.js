(function() {
   var passport = require('passport')
   var LocalStrategy = require('passport-local').Strategy
   var app = require('express')()

   app.use(passport.initialize())
   app.use(passport.session())

   passport.serializeUser(function(user, done) {
      done(null, user.id)
   })
   passport.deserializeUser(function(id, done) {
      done(null, { id: id, name: 'Matt Todd' })
   })

   passport.use(new LocalStrategy(function(username, password, done) {
      console.log('********************')
      console.log('authenticating...')
      if (username === 'user123' && password === 'password') {
         console.log(' - good credentials')
         done(null, {id: 123})
      } else {
         console.log(' - failed login')

         done({ message: 'Unauthenticated user' })
      }
   }))

   app.use(function(req, res, next) {
      if (req.user || req.path == '/login') {
         next()
      } else {
         res.redirect('/login')
      }
   })

   module.exports = app
})()
