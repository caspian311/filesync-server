(function() {
   var express = require('express')
     , http = require('http')
     , path = require('path')
     , files = require('./app/files')
     , main = require('./app/main')
     , login = require('./app/login')

   var app = express()

   app.use(express.logger('dev'))
   app.use(express.bodyParser())
   app.use(express.methodOverride())
   app.use(express.static(path.join(__dirname, 'public')))
   app.set('view engine', 'jade')

   app.use(main)
   app.use(files)
   app.use(login)

   http.createServer(app).listen(3000, function(){
     console.log("Express server listening on port 3000")
   })
})()
