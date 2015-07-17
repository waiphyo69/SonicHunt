Sonichunt.Views.ProductShow = Backbone.CompositeView.extend({

  template: JST["products/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "add sync remove", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.listenTo(this.model.reviews(), "remove", this.removeReview);
    this.model.reviews().each(this.addReview.bind(this));
    this.addReviewNewForm();
  },

  events: {
    "click .new-review-button": "displayNewReviewForm"
  },

  displayNewReviewForm: function(){
    $(".new-review").css("display","block");
  },


  addReview: function(review){
    var reviewItemView = new Sonichunt.Views.ReviewItem({model: review});
    this.addSubview(".reviews", reviewItemView);
  },

  addReviewNewForm: function(){
    var review = new Sonichunt.Models.Review();
    var reviewNewView = new Sonichunt.Views.ReviewForm({
      collection: this.model.reviews(),
      model: review,
      productid: this.model.id
    });
    this.addSubview(".new-review", reviewNewView);
  },

  removeReview: function (review) {
    this.removeModelSubview(".reviews", review)
  },


  render: function(){
    var content = this.template({product: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
