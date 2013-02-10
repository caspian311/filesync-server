(function() {
   var LoginModel = require('./login_model')

   var LoginController = function(login_model) {
      if (!login_model)
         login_model = new LoginModel()

      var _form = function(req, res) {
         res.render('form', {title: 'Login', errors: []})
      }

      var _login = function(req, res) {
         try {
            login_model.validate_credentials(req.body.username, req.body.password, function() {
               res.redirect('/')
            })
         } catch (e) {
            console.log(e)
            res.render('form', {title: 'Login', errors: ['Bad login']})
         }
      }

      return {
         form: _form,
         login: _login,
      }
   }

   module.exports = LoginController
})()
