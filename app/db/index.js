(function() {
   var mongo = require('mongoskin');
   var db = mongo.db('localhost:27017/test?auto_reconnect=true', { database: 'test', safe: true })

   module.exports = exports = db
})()
