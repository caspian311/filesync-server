(function() {
   var fs = require('fs')
   var chai = require('chai')
   chai.should()
   var assert = chai.assert

   var files_steps = function() {
      this.World = require('../support/world').World
      this.Before(function(callback) {
         fs.readdir('/tmp/uploads', function(err, files) {
            files.map(function(file) {
               fs.unlink('/tmp/uploads/' + file)
            })
            callback()
         })
      })

      this.Given(/^I have existing files$/, function(callback) {
         fs.writeFile('/tmp/uploads/test_file1.txt', '')
         fs.writeFile('/tmp/uploads/test_file2.txt', '')
         fs.writeFile('/tmp/uploads/test_file3.txt', '')
         callback();
      })

      this.Then(/^I should see my existing files$/, function(callback) {
         this.find_text('test_file1.txt', 'test_file2.txt', 'test_file3.txt', callback)
      })
   }

   module.exports = files_steps

})()

