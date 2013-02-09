(function() {
   var fs = require('fs'),
       util = require('util')

   var FILES_DIRECTORY = "/tmp/uploads/"

   var _get_all_files = function(callback) {
      fs.readdir(FILES_DIRECTORY, function(err, files) {
         if (err)
            throw err

         if (!files) {
            files = []
         }
         callback(files)
      })
   }

   var _upload = function(uploaded_file, callback) {
      fs.readFile(uploaded_file.path, function(err, data) {
         if (err)
            throw err

         var newPath = FILES_DIRECTORY + uploaded_file.filename
         fs.writeFile(newPath, data, function(err) {
            if (err)
               throw err

            callback()
         })
      })
   }

   var _delete_file = function(file_to_delete, callback) {
      fs.unlink(FILES_DIRECTORY + file_to_delete, function(err) {
         if (err) {
            throw err
         }

         callback()
      })
   }

   var FileModel = function() {
      return {
         get_all_files: _get_all_files,
         upload: _upload,
         delete_file: _delete_file
      }
   }
   module.exports = FileModel
})()
