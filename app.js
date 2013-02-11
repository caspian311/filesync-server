(function() {
   var express = require('express')
     , http = require('http')
     , path = require('path')
     , passport = require('passport')
     , LocalStrategy = require('passport-local').Strategy
     , files = require('./app/files')
     , main = require('./app/main')
     , login = require('./app/login')

   var app = express()

   app.use(express.static(path.join(__dirname, 'public')))
   app.set('view engine', 'jade')

   app.use(express.logger('dev'))
   app.use(express.bodyParser())
   app.use(express.methodOverride())

   app.use(express.cookieParser())
   app.use(express.session({ secret: 'keyboard cat' }))
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

   app.use(main)
   app.use(files)
   app.use(login)

   http.createServer(app).listen(3000, function(){
     console.log("Express server listening on port 3000")
   })
})()
