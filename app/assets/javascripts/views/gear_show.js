Sonichunt.Views.GearShow = Backbone.CompositeView.extend({

  template: JST["gears/show"],

  className: "gear-show group",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.products(), "add", this.addProduct);
    this.model.products().each(this.addProduct.bind(this));
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


  removeComment: function (comment) {
    this.removeModelSubview(".comments", comment)
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
    "click .new-comment-button": "displayNewCommentForm"
  },

  displayNewCommentForm: function(){
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
    var content = this.template({gear: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
