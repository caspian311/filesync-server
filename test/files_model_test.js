(function () {
   var fs = require('fs')
   var FilesModel = require('../app/files/files_model')

   var test_directory = '/tmp/test_directory'
   var other_test_directory = '/tmp/other_test_directory'

   function forceDeleteDirSync(dirPath) {
      try {
         var files = fs.readdirSync(dirPath)
      } catch(e) {
         return
      }
      files.map(function(file) {
         var filePath = dirPath + '/' + file
         if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
         else
            rmDir(filePath);
      })
      fs.rmdirSync(dirPath);
   }

   beforeEach(function() {
      forceDeleteDirSync(test_directory)
      forceDeleteDirSync(other_test_directory)
      fs.mkdirSync(test_directory, 0755)
      fs.mkdirSync(other_test_directory, 0755)
   })

   afterEach(function() {
      forceDeleteDirSync(test_directory)
      forceDeleteDirSync(other_test_directory)
   })

   describe('FilesModel', function() {
      var test_object = new FilesModel(test_directory)

      describe('#get_all_files', function(done) {
         it('should retrieve all files in given directory', function(done) {
            fs.writeFileSync(test_directory + '/1', '')
            fs.writeFileSync(test_directory + '/2', '')
            fs.writeFileSync(test_directory + '/3', '')

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
            var new_file_path = other_test_directory + '/new_1'
            fs.writeFileSync(new_file_path, 'abc')

            var new_filename = 'new_file_name'
            var new_file = {
               filename: '/' + new_filename,
               path: new_file_path
            }

            test_object.upload(new_file, function() {
               fs.readdir(test_directory, function(err, files) {
                  assert.strictEqual(1, files.length)
                  assert.include(files, new_filename)
                  done()
               })
            })
         })
      })

      describe('#delete_file', function(done) {
         it('should delete the given file', function(done) {
            fs.writeFileSync(test_directory + '/1', '')
            fs.writeFileSync(test_directory + '/2', '')
            fs.writeFileSync(test_directory + '/3', '')

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
