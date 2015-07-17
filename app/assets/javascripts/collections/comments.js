Sonichunt.Collections.Comments = Backbone.Collection.extend({
  url: "api/comments",

  getorFetch: function(id){
    var comments = this;
    var comment = this.get(id);
    if (comment){
      comment.fetch();
    } else {
      var comment = new Sonichunt.Models.Comment({id: id});
      comment.fetch({
        success: function(){
          comments.add(comment)
        }
      })
    }
    return comment;
  }
})
