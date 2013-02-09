(function() {
   var MainController = require('../app/main/main_controller')

   describe('MainController', function() {
      var test_object = new MainController()

      describe('#index', function() {
         var actual_view, actual_model
         var mock_response = {
            render: function(view, model) {
               actual_view = view
               actual_model = model
            }
         }

         test_object.index({}, mock_response)

         it('should render the correct view', function() {
            assert.strictEqual('index', actual_view)
         })

         it('should have the correct title', function() {
            assert.strictEqual('Filesync', actual_model.title)
         })
      })
   })
})()
