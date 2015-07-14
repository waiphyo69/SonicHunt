Sonichunt.Views.ProductShow = Backbone.CompositeView.extend({

  template: JST["products/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.model.reviews().each(this.addReview.bind(this));
  },

  addReview: function(review){
    var reviewItemView = new Sonichunt.Views.ReviewItem({model: review});
    this.addSubview(".reviews", reviewItemView);
  },

  render: function(){
    var content = this.template({product: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
