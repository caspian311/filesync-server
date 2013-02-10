(function() {
   var LoginController = require('../app/login/login_controller')

   describe('LoginController', function() {
      var mock_login_model = {}
      var test_object = new LoginController(mock_login_model)


      describe('#form', function() {
         var received_view, received_model
         var mock_response = {
            render: function(view, model) {
               received_view = view
               received_model = model
            }
         }

         test_object.form({}, mock_response)

         it('should render the correct page', function() {
            assert.strictEqual('form', received_view)
         })

         it('should have the correct title', function() {
            assert.strictEqual('Login', received_model.title)
         })

         it('should have no errors', function() {
            assert.strictEqual(0, received_model.errors.length)
         })
      })

      describe('#login', function() {
         var expected_username = 'expected username', expected_password = 'expected pass'
         var mock_request = {
            body: {
               username: expected_username,
               password: expected_password
            }
         }

         it('should pass the username and password to the model to validate', function() {
            var actual_username, actual_password
            mock_login_model.validate_credentials = function(username, password, callback) {
               actual_username = username
               actual_password = password
               callback()
            }

            test_object.login(mock_request, { redirect: function() {}, render: function() {}})

            assert.strictEqual(expected_username, actual_username)
            assert.strictEqual(expected_password, actual_password)
         })

         describe("bad login", function() {
            var received_view, received_model
            var mock_response = {
               render: function(view, model) {
                  received_view = view
                  received_model = model
               }
            }

            mock_login_model.validate_credentials = function() {
               throw "Bad login"
            }


            test_object.login(mock_request, mock_response)

            it('should render the correct page', function() {
               assert.strictEqual('form', received_view)
            })

            it('should provide a login error', function() {
               assert.strictEqual(1, received_model.errors.length)
               assert.strictEqual('Bad login', received_model.errors[0])
            })
         })

         describe("good login", function() {
            var redirected_url
            var mock_response = {
               redirect: function(url) {
                  redirected_url = url
               }
            }
            mock_login_model.validate_credentials = function(username, password, callback) {
               callback()
            }

            test_object.login(mock_request, mock_response)



            it('should redirect to the correct page', function() {
               assert.strictEqual('/', redirected_url)
            })
         })
      })
   })
})()
