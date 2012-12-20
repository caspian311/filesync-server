var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , files = require('./routes/files')

var app = express()

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.locals.pretty = true

  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

app.get('/', routes.index)
app.get('/files', files.list)
app.get('/files/create', files.create)
app.post('/files', files.upload)
app.delete('/files/:file_to_delete', files.delete_file)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})
