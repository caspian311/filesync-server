(function() {
   var app = require('express')()

   app.locals.pretty = true
   app.set('views', __dirname)

   app.get('/', function(req, res){
     res.render('index', { title: 'Filesync' })
   })

   module.exports = app
})()
