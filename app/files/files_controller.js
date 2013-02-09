(function() {
   var FilesController = function(files_model) {
      var _list = function(req, res) {
         files_model.get_all_files(function(files) {
            res.render("files", {title: "Uploaded Files", files: files})
         })
      }

      var _upload = function(req, res) {
         files_model.upload(req.files.uploaded_file, function() {
            res.redirect("/files")
         })
      }

      var _create = function(req, res) {
         res.render("new_file", {title: "New file to upload"})
      }

      var _delete_file = function(req, res) {
         files_model.delete_file(req.params.file_to_delete, function() {
            res.send(200, {message: "success"})
         })
      }

      return {
         list: _list,
         upload: _upload,
         create: _create,
         delete_file: _delete_file
      }
   }

   module.exports = FilesController
})()
