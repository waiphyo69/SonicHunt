Sonichunt.Views.ReviewItem = Backbone.CompositeView.extend({

  tagName: "li",

  className: "review-item group",

  template: JST["reviews/item"],

  initialize: function(){
    this.listenTo( this.model, "sync change", this.render);
    this.listenTo( this.model.upvote(), "sync change reset remove", this.render );
    this.listenTo( this.model.upvoters(), "sync add remove", this.render );
    this.addEditForm();
  },

  events: {
    "click .edit-review-button": "displayEditForm",
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
    this.model.upvoters().add(Sonichunt.currentUser);
  },

  destroyUpvote: function () {
    var that = this;
    this.model.upvote().destroy({
      success: function(model){
        that.model.upvoters().remove(Sonichunt.currentUser);
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
    var numUpvoters = this.model.upvoters().length;
    var content = this.template({review: this.model, numUpvoters: numUpvoters});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
