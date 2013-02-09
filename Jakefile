(function() {
   var exec = require('child_process').exec

   desc('Run all unit tests')
   task('test', function() {
      run('NODE_ENV=test ./node_modules/.bin/mocha --reporter spec --require test/test_helper.js --colors')
   })

   function run(command) {
      exec(command, function(err, output) {
         console.log(output)
         if (err)
            throw err
      })
   }
})()