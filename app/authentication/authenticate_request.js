(function() {
   var authenticate_request = function(req, res, next) {
      if (req.user || req.path == '/login') {
         next()
      } else {
         res.redirect('/login')
      }
   }

   exports = module.exports = authenticate_request
})()
