Sonichunt.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",
  model: Sonichunt.Models.Review,
  getorFetch: function(id){
    var reviews = this;
    var review = this.get(id);
    if (review){
      review.fetch();
    } else {
      var review = new Sonichunt.Models.Review({id: id});
      review.fetch({
        success: function(){
          reviews.add(review)
        }
      })
    }
    return review;
  }
})
