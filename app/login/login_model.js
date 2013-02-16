(function() {
   var LoginModel = function() {
      return {
         validate_credentials: function(username, password, callback) {
            console.log('logging in with: ' + username + '/' + password)
            if (username === 'user123' && password == 'password') {
               callback()
            } else {
               throw 'Bad login'
            }
         }
      }
   }

   module.exports = LoginModel
})()
