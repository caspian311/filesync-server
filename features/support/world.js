(function() {
   var url = require('./url_helper')('http://localhost:3000')
   var zombie = require('zombie')
   var chai = require('chai')
   chai.should()
   var assert = chai.assert

   var World = function World(callback) {
      this.browser = new zombie.Browser()

      this.visit = function(page_name, callback) {
         this.browser.visit(url.for_page(page_name), callback)
      }

      this.find_text = function() {
         var entire_text = this.browser.text('body')
         for (var i=0; i<arguments.length-1; i++) {
            assert.include(entire_text, arguments[i])
         }
         arguments[arguments.length-1]()
      }

      callback()
   }

   exports.World = World
})()
