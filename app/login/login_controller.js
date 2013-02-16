(function() {
   var LoginModel = require('./login_model')

   var LoginController = function(login_model) {
      if (!login_model)
         login_model = new LoginModel()

      var _form = function(req, res) {
         res.render('form', {title: 'Login', errors: []})
      }

      return {
         form: _form
      }
   }

   module.exports = LoginController
})()
