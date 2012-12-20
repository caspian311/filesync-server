
$(function() {
   $("#upload_file_button").click(function() {
      $("#file_upload_form").submit()
   })

   $(".delete-file").live("click", function() {
      var row = $(this).parents("tr:first")
      var url = "/files/" + $(this).attr("id")

      $.ajax({url: url, type: "DELETE"})
         .fail(function(err) {
            alert("Error: " + err.statusText)
         })
         .done(function() {
            row.remove()
         })
   })
})
