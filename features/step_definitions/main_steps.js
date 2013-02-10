(function() {
   var main_steps = function() {
      this.World = require('../support/world').World

      this.Given(/^I am a user$/, function(callback) {
         callback()
      })

      this.When(/^I go to the (.*) page$/, function(page_name, callback) {
         this.visit(page_name, callback)
      })

      this.Then(/^I should see "(.*)"$/, function(text, callback) {
         this.find_text(text, callback)
      })
   }
   module.exports = main_steps
})()
