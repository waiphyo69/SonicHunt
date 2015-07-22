Sonichunt.Views.ReviewShow = Backbone.CompositeView.extend({

  template: JST["reviews/show"],


  className: "review-show group",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
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


  removeComment: function (comment) {
    this.removeModelSubview(".comments", comment)
  },


  events: {
    "click .new-comment-button": "displayNewCommentForm"
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
    var content = this.template({review: this.model, product: this.model.product});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
