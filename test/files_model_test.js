(function () {
   var db = require('../app/db')
   var Step = require('step')
   var FilesModel = require('../app/files/files_model')

   beforeEach(function(done) {
      db.files.remove({}, done)
   })

   afterEach(function() {
      db.files.remove({}, done)
   })

   describe('FilesModel', function() {
      var test_object = new FilesModel(target_directory)

      describe('#get_all_files', function(done) {
         it('should retrieve all files in given directory', function(done) {
            Step(
               db.files.insert({ name: '1'}, this),
               db.files.insert({ name: '2'}, this),
               db.files.insert({ name: '3'}, this),
               function() {
                  test_object.get_all_files(function(files) {
                     assert.strictEqual(3, files.length)
                     assert.include(files, '1')
                     assert.include(files, '2')
                     assert.include(files, '3')
                     done()
                  })
               }
            )
         })
      })

      describe('#upload', function(done) {
         it('should add a file to the given directory', function(done) {
            var new_file_path = source_directory + '/new_1'
            fs.writeFileSync(new_file_path, 'abc')

            var new_filename = 'new_file_name'
            var new_file = {
               filename: '/' + new_filename,
               path: new_file_path
            }

            test_object.upload(new_file, function() {
               db.files.find({}, function(err, files) {
                  assert.strictEqual(1, files.length)
                  assert.include(files, new_filename)
                  done()
               })
            })
         })
      })

      describe('#delete_file', function(done) {
         it('should delete the given file', function(done) {
            Step(
               db.files.insert({ name: '1'}, this),
               function(err) {
                  db.files.insert({ name: '2'}, this)
               },
               function(err) {
                  db.files.insert({ name: '3'}, this)
               },
               function(err) {
                  test_object.delete_file('/2', function() {
                     db.files.find({}, function(err, files) {
                        assert.strictEqual(2, files.length)
                        assert.include(files, '1')
                        assert.include(files, '3')
                        done()
                     })
                  })
               }
            )
         })
      })
   })
})()
