(function() {
   var express = require('express')
   var app = express()

   var model = require('./files_model')()
   var controller = require('./files_controller')(model)

   app.locals.pretty = true
   app.set('views', __dirname)

   app.get('/files', controller.list)
   app.get('/files/create', controller.create)
   app.post('/files', controller.upload)
   app.delete('/files/:file_to_delete', controller.delete_file)

   module.exports = app
})()
