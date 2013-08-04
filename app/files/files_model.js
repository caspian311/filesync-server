(function() {
   var db = require('../db')

   var FileModel = function() {
      var _get_all_files = function(callback) {
         fs.readdir(files_directory, function(err, files) {
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

            var newPath = files_directory + uploaded_file.filename
            fs.writeFile(newPath, data, function(err) {
               if (err)
                  throw err

               callback()
            })
         })
      }

      var _delete_file = function(file_to_delete, callback) {
         fs.unlink(files_directory + file_to_delete, function(err) {
            if (err) {
               throw err
            }

            callback()
         })
      }

      return {
         get_all_files: _get_all_files,
         upload: _upload,
         delete_file: _delete_file
      }
   }

   module.exports = FileModel
})()
