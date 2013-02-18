(function() {
   var mongo = require('mongoskin');

   var db = function(req, res, next) {
      req.db = mongo.db('localhost:27017/test?auto_reconnect=true', { database: 'test', safe: true })
      next()
   }

   module.exports = exports = db
})()
