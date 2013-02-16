(function() {
   var LoginModel = require('../app/login/login_model')

   describe('LoginModel', function() {
      var test_object = new LoginModel()

      describe('#validate_credentials', function() {
         it('should call callback when username and password are good', function(done) {
            var username = 'user123', password = 'password'

            test_object.validate_credentials(username, password, done)
         })

         it('should throw error when username and password bad', function() {
            var username = 'user123', password = 'blah'

            try {
               test_object.validate_credentials(username, password, function() {})
               assert.fail('should have failed')
            } catch (e) {
               assert.strictEqual('Bad login', e)
            }
         })
      })
   })
})()
