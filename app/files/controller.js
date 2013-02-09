(function() {
   var fs = require('fs'),
       util = require('util')

   var Controller = function() {
      var list = function(req, res) {
         fs.readdir("/tmp/uploads", function(err, files) {
            if (!files) {
               files = []
            }
            res.render("files", {title: "Uploaded Files", files: files})
         })
      }

      var upload = function(req, res) {
         fs.readFile(req.files.uploaded_file.path, function(err, data) {
            if (err)
               throw err

            var newPath = "/tmp/uploads/" + req.files.uploaded_file.filename
            fs.writeFile(newPath, data, function(err) {
               if (err)
                  throw err

               res.redirect("/files")
            })
         })
      }

      var create = function(req, res) {
         res.render("new_file", {title: "New file to upload"})
      }

      var delete_file = function(req, res) {
         fs.unlink("/tmp/uploads/" + req.params.file_to_delete, function(err) {
            if (err) {
               throw err
            }

            res.send(200, {message: "success"})
         })
      }

      return {
         list: list,
         upload: upload,
         create: create,
         delete_file: delete_file
      }
   }

   module.exports = Controller
})()
