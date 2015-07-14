Sonichunt.Views.ProductShow = Backbone.CompositeView.extend({

  template: "products/show",

  initialize: function(){
    this.listenTo(this.model.reviews,() "add", this.addReview);
    this.model.cards().each(this.addReview.bind(this));
  }

})
