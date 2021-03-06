(function() {
   var express = require('express')
     , http = require('http')
     , path = require('path')
     , passport = require('passport')
     , LocalStrategy = require('passport-local').Strategy
     , files = require('./app/files')
     , main = require('./app/main')
     , login = require('./app/login')
     , authentication = require('./app/authentication')

   var app = express()

   app.use(express.static(path.join(__dirname, 'public')))
   app.set('view engine', 'jade')

   app.use(express.logger('dev'))
   app.use(express.bodyParser())
   app.use(express.methodOverride())
   app.use(express.cookieParser())
   app.use(express.session({ secret: 'keyboard cat' }))

   app.use(authentication)

   app.use(main)
   app.use(files)
   app.use(login)

   http.createServer(app).listen(3000, function(){
     console.log("Express server listening on port 3000")
   })
})()
