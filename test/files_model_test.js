(function () {
   var fs = require('fs')
   var FilesModel = require('../app/files/files_model')

   var test_directory = '/tmp/test_directory'

   beforeEach(function() {
      fs.rmdir(test_directory)
      fs.mkdir(test_directory, 0755)
   })

   afterEach(function() {
      fs.rmdir(test_directory)
   })

   describe('FilesModel', function() {
      var test_object = new FilesModel(test_directory)

      describe('#get_all_files', function(done) {
         it('should retrieve all files in given directory', function(done) {
            fs.writeFile(test_directory + '/1', '')
            fs.writeFile(test_directory + '/2', '')
            fs.writeFile(test_directory + '/3', '')

            test_object.get_all_files(function(files) {
               assert.strictEqual(3, files.length)
               assert.include(files, '1')
               assert.include(files, '2')
               assert.include(files, '3')
               done()
            })
         })
      })

      describe('#upload', function(done) {
         it('should add a file to the given directory', function(done) {
            fs.writeFile(test_directory + '/1', '')
            fs.writeFile(test_directory + '/2', '')
            fs.writeFile(test_directory + '/3', '')

            var new_file = {
               filename: '',
               path: ''
            }
            test_object.uplaod(new_file, function() {
               fs.readdir(test_directory, function(err, files) {
                  assert.strictEqual(2, files.length)
                  assert.include(files, '1')
                  assert.include(files, '3')
                  done()
               })
            })
         })
      })

      describe('#delete_file', function(done) {
         it('should delete the given file', function(done) {
            fs.writeFile(test_directory + '/1', '')
            fs.writeFile(test_directory + '/2', '')
            fs.writeFile(test_directory + '/3', '')

            test_object.delete_file('/2', function() {
               fs.readdir(test_directory, function(err, files) {
                  assert.strictEqual(2, files.length)
                  assert.include(files, '1')
                  assert.include(files, '3')
                  done()
               })
            })
         })
      })
   })
})()
