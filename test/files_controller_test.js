(function() {
   var FilesController = require('../app/files/files_controller')

   describe('FilesController', function() {
      var mock_files_model = {}
      var test_object = new FilesController(mock_files_model)

      describe('#list', function() {
         var expected_files = ['a', 'b', 'c']
         var received_path, received_model
         mock_files_model.get_all_files = function(callback) {
            callback(expected_files)
         }
         var mock_response = {
            render: function(path, model) {
               received_path = path
               received_model = model
            }
         }

         test_object.list({}, mock_response)

         it('should render the correct view', function() {
            assert.strictEqual('files', received_path)
         })

         it('should populate the title', function() {
            assert.strictEqual('Uploaded Files', received_model.title)
         })

         it('should populate the files from the model', function() {
            assert.strictEqual(expected_files, received_model.files)
         })
      })

      describe('#upload', function() {
         var received_file
         mock_files_model.upload = function(file, callback) {
            received_file = file
            callback()
         }
         var mock_response = {
            redirect: function(path) {
               received_path = path
            }
         }
         var expected_file = 'test 123'
         var mock_request = {
            files: {
               uploaded_file: expected_file
            }
         }

         test_object.upload(mock_request, mock_response)

         it('should redirect to the correct path', function() {
            assert.strictEqual('/files', received_path)
         })

         it('should received file should be given to model', function() {
            assert.strictEqual(expected_file, received_file)
         })
      })

      describe('#create', function() {
         var actual_path, actual_model
         var mock_response = {
            render: function(path, model) {
               actual_path = path
               actual_model = model
            }
         }
         test_object.create({}, mock_response)

         it('should render the correct view', function() {
            assert.strictEqual('new_file', actual_path)
         })

         it('should supply the correct title', function() {
            assert.strictEqual('New file to upload', actual_model.title)
         })
      })

      describe('#delete_file', function() {
         var actual_path, actual_model
         var mock_response = {
            send: function(code, model) {
               actual_response_code = code
               actual_model = model
            }
         }
         var received_file
         mock_files_model.delete_file = function(file_to_be_deleted, callback) {
            received_file = file_to_be_deleted
            callback()
         }

         var given_file = 'given file'
         var mock_request = {
            params: {
               file_to_delete: given_file
            }
         }
         test_object.delete_file(mock_request, mock_response)

         it('should delete the given file', function() {
            assert.strictEqual(given_file, received_file)
         })

         it('should send the correct return code', function() {
            assert.strictEqual(200, actual_response_code)
         })

         it('should a success message', function() {
            assert.strictEqual('success', actual_model.message)
         })
      })
   })
})()
