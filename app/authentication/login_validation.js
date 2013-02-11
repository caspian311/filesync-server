(function() {
   var login_validation = function(username, password, done) {
      if (username === 'user123' && password === 'password') {
         done(null, {id: 123})
      } else {
         done({ message: 'Unauthenticated user' })
      }
   }

   exports = module.exports = login_validation
})()
