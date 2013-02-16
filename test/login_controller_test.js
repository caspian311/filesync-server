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
   })
})()
