(function() {
   var url_helper = function(url_prefix) {
      var page_mappings = {}
      page_mappings['main'] = '/'
      page_mappings['files'] = '/files'
      page_mappings['login'] = '/login'

      var _url_for = function(page_name) {
         return url_prefix + page_mappings[page_name]
      }

      return {
         for_page: _url_for
      }
   }

   module.exports = url_helper
})()
