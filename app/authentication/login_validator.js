(function() {
   var LoginValidation = function() {
      var _validate_login = function(username, password, done) {
         if (username === 'user123' && password === 'password') {
            done(null, {id: 123})
         } else {
            done({ message: 'Unauthenticated user' })
         }
      }

      return {
         validate_login: _validate_login
      }
   }

   module.exports = LoginValidation
})()
