(function() {
   var MainController = function() {
      var _index = function(req, res){
        res.render('index', { title: 'Filesync' })
      }

      return {
         index: _index
      }
   }

   module.exports = MainController
})()
