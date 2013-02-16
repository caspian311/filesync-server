(function() {
   var LoginValidator = require('../app/authentication/login_validator')

   describe('LoginValidator', function() {
      var test_object = new LoginValidator()

      describe('#validate_login', function() {

         it('should populate user if correct username and password are given', function(done) {
            var username = 'user123', password = 'password'

            test_object.validate_login(username, password, function(error, user) {
               assert.strictEqual(123, user.id)
               assert(!error)
               done()
            })
         })

         it('should give error if incorrect username and password are given', function(done) {
            var username = 'not user', password = 'not password'

            test_object.validate_login(username, password, function(error, user) {
               assert(error, 'should have given an error')
               assert(!user, 'should not have given a user')
               done()
            })
         })
      })
   })
})()
