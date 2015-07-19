Sonichunt.Views.ReviewItem = Backbone.CompositeView.extend({

  tagName: "li",

  className: "review-item",

  template: JST["reviews/item"],

  initialize: function(){
    this.listenTo( this.model, "sync change", this.render);
    this.listenTo( this.model.upvote(), "sync change reset remove", this.render );
    this.addEditForm();
  },

  events: {
    "click button.edit-review-button": "displayEditForm",
    "click .review-delete": "destroyReview",
    "click .upvote-button": "toggleUpvote"
  },


  createUpvote: function () {
    var that = this;
    this.model.upvote().set({
      upvoter_id: Sonichunt.currentUser.id,
      review_id: parseInt(this.model.escape('id'))
    });
    this.model.upvote().save();
  },

  destroyUpvote: function () {
    var that = this;
    this.model.upvote().destroy({
      success: function(model){
        model.unset("id");
      }
    });
  },

  toggleUpvote: function (event) {
    event.preventDefault();
    if (this.model.upvote().isNew()) {
      this.createUpvote();
    } else {
      this.destroyUpvote();
    }
  },

  destroyReview: function(){
    event.preventDefault();
    this.model.destroy();
    alert("Review successfully deleted!")
  },

  displayEditForm: function(){
    $(".edit-review-"+ this.model.escape('id')).css("display","block");
  },


  addEditForm: function(){
    var review = new Sonichunt.Collections.Reviews().getorFetch(this.model.id);
    var editView = new Sonichunt.Views.ReviewForm({
      model: review
    });
    this.addSubview(".edit-review-"+this.model.id, editView);
  },

  render: function(){
    var content = this.template({review: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
