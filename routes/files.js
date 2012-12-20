var fs = require('fs')

exports.list = function(req, res) {
   res.render("files", {title: "Uploaded Files"})
}

exports.upload = function(req, res) {
   fs.readFile(req.files.uploaded_file.path, function(err, data) {
      if (err)
         throw err

      var newPath = "/tmp/uploads/" + req.files.uploaded_file.filename
      fs.writeFile(newPath, data, function(err) {
         if (err)
            throw err

         res.send(200, { messgae: "upload successful" })
      })
   })
}

exports.create = function(req, res) {
   res.render("new_file", {title: "New file to upload"})
}
