Sonichunt.Views.ProductShow = Backbone.CompositeView.extend({

  template: JST["products/show"],

  className: "product-show group",

  initialize: function(){
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.reviews(), "add sync remove", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.listenTo(this.model.reviews(), "remove", this.removeReview);
    this.model.reviews().each(this.addReview.bind(this));
    this.addReviewNewForm();
    $(document).on("click","#search", function(){
      if (Sonichunt.router._currentView.className === "product-show group") {
        Backbone.history.navigate("#/products", { trigger: true });
      }
    })
  },

  events: {
    "click .new-review-button": "displayNewReviewForm"
  },

  displayNewReviewForm: function(){
    $(".new-review").css("display","block");
  },


  addReview: function(review){
    var that = this;
    review.fetch({
      success: function(){
        var reviewItemView = new Sonichunt.Views.ReviewItem({model: review});
        that.addSubview(".reviews", reviewItemView);
      }
    })
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
    var that = this;
    this.removeModelSubview(".reviews", review)
    this.model.save({},{
      success: function(){
        Backbone.history.navigate("#/products/"+that.model.escape('id'), {trigger: true})
      }
    })
  },


  render: function(){
    var content = this.template({product: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
