Sonichunt.Views.ReviewShow = Backbone.CompositeView.extend({

  template: JST["reviews/show"],


  className: "review-show group",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo( this.model.upvote(), "sync change reset remove", this.render );
    this.listenTo( this.model.upvoters(), "sync add remove", this.render );
    this.listenTo(this.model.comments(), "add sync remove", this.render);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.model.comments().each(this.addComment.bind(this));
    this.addCommentNewForm();
    this.listenTo(this.model.comments(), "remove", this.removeComment);
    $(document).on("click","#search", function(){
      if (Sonichunt.router._currentView.className === "review-show group") {
        Backbone.history.navigate("#/products", { trigger: true });
      }
    })
  },


  events: {
    "click .new-comment-button": "displayNewCommentForm",
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

  removeComment: function (comment) {
    this.removeModelSubview(".comments", comment)
  },


  displayNewCommentForm: function(){
    $(".new-comment").show();
  },

  addCommentNewForm: function(){
    var comment = new Sonichunt.Models.Comment();
    var commentNewView = new Sonichunt.Views.CommentForm({
      collection: this.model.comments(),
      model: comment,
      parentID: this.model.id,
      parentType: "Review"
    });
    this.addSubview(".new-comment", commentNewView);
  },

  addComment: function(comment){
    var commentItemView = new Sonichunt.Views.CommentItem({model: comment});
    this.addSubview(".comments", commentItemView);
  },

  render: function(){
    var numUpvoters = this.model.upvoters().length;
    var content = this.template({review: this.model, product: this.model.product, numUpvoters: numUpvoters});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
