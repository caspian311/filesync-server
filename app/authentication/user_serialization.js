(function() {
   var user_serialization = function() {
      var _serialize = function(user, done) {
         done(null, user.id)
      }

      var _deserialize = function(id, done) {
         done(null, { id: id, name: 'Matt Todd' })
      }

      return {
         serialize: _serialize,
         deserialize: _deserialize
      }
   }

   module.exports = user_serialization
})()
