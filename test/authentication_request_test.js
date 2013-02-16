(function() {
   var authentication_request = require('../app/authentication/authenticate_request')

   describe('authenticate_request', function() {
      describe('authenticated user', function() {
         it('should call the next callback', function() {
            var req = { user: {} }
            var next = sinon.spy()

            authentication_request(req, {}, next)

            assert(next.called)
         })
      })

      describe('unauthenticated user', function() {
         it('should be redirected to /login', function() {
            var res = {}
            res.redirect = sinon.spy()

            authentication_request({}, res, function()  {})

            assert(res.redirect.calledWith('/login'))
         })
      })

      describe('unauthenticated user trying to login', function() {
         it('should be allowed to login', function() {
            var req = { }
            req.path = '/login'
            var next = sinon.spy()

            authentication_request(req, {}, next)

            assert(next.called)
         })
      })
   })
})()
