Parse.Cloud.afterDelete("TodoList", function(request) {
  query = new Parse.Query("TodoItems");
  query.equalTo("todoList", request.object);
  query.find({
    success: function(todoItems) {
      Parse.Object.destroyAll(todoItems, {
        success: function() {},
        error: function(error) {
          console.error("Erreur lors de la suppression des todo item " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Erreur lors de la recherche des todo item " + error.code + ": " + error.message);
    }
  });
});
