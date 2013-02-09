(function() {
   var fs = require('fs'),
       util = require('util')

   exports.list = function(req, res) {
      fs.readdir("/tmp/uploads", function(err, files) {
         if (!files) {
            files = []
         }
         res.render("files", {title: "Uploaded Files", files: files})
      })
   }

   exports.upload = function(req, res) {
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

   exports.create = function(req, res) {
      res.render("new_file", {title: "New file to upload"})
   }

   exports.delete_file = function(req, res) {
      fs.unlink("/tmp/uploads/" + req.params.file_to_delete, function(err) {
         if (err) {
            throw err
         }

         res.send(200, {message: "success"})
      })
   }
})()
