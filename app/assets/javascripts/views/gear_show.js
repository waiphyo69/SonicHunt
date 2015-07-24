Sonichunt.Views.GearShow = Backbone.CompositeView.extend({

  template: JST["gears/show"],

  className: "gear-show group",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.products(), "add", this.addProduct);
    this.model.products().each(this.addProduct.bind(this));
    this.listenTo( this.model.upvote(), "sync change reset remove", this.render );
    this.listenTo( this.model.upvoters(), "sync add remove", this.render );
    this.listenTo(this.model.comments(), "add sync remove", this.render);
    this.listenTo(this.model.comments(), "add", this.addComment);
    this.model.comments().each(this.addComment.bind(this));
    this.addCommentNewForm();
    this.listenTo(this.model.comments(), "remove", this.removeComment);
    $(document).on("click","#search", function(){
      if (Sonichunt.router._currentView.className === "gear-show group") {
        Backbone.history.navigate("#/products", { trigger: true });
      }
    })
  },



  createUpvote: function () {
    var that = this;
    this.model.upvote().set({
      subscriber_id: Sonichunt.currentUser.id,
      gear_id: parseInt(this.model.escape('id'))
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
    var that = this;
    this.removeModelSubview(".comments", comment);
    this.model.save({},{
      success: function(){
        Backbone.history.navigate("#/gears/"+that.model.escape('id'), {trigger: true})
      }
    })
  },

  addCommentNewForm: function(){
    var comment = new Sonichunt.Models.Comment();
    var commentNewView = new Sonichunt.Views.CommentForm({
      collection: this.model.comments(),
      model: comment,
      parentID: this.model.id,
      parentType: "Gear"
    });
    this.addSubview(".new-comment", commentNewView);
  },

  events: {
    "click .new-comment-button": "displayNewCommentForm",
    "click .gear-show-upvote-button": "toggleUpvote"
  },

  displayNewCommentForm: function(){
    var comment = new Sonichunt.Models.Comment();
    var commentNewView = new Sonichunt.Views.CommentForm({
      collection: this.model.comments(),
      model: comment,
      parentID: this.model.id,
      parentType: "Gear"
    });
    $(".new-comment").html(commentNewView.render().$el);
    $(".new-comment").show();
  },

  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview(".products", productItemView);
  },

  addComment: function(comment){
    var commentItemView = new Sonichunt.Views.CommentItem({model: comment});
    this.addSubview(".comments", commentItemView);
  },

  render: function(){
    var numUpvoters = this.model.upvoters().length;
    var content = this.template({gear: this.model, numUpvoters: numUpvoters});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
