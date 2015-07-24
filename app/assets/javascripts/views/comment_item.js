Sonichunt.Views.CommentItem = Backbone.CompositeView.extend({

  tagName: "li",

  template: JST["comments/item"],

  className: "comment-item",

  initialize: function(){
    this.listenTo(this.model,"sync change", this.render);
    this.addEditForm();
  },

  render: function(){
    var content = this.template({comment: this.model});
    this.$el.html(content);
    return this;
  },

  addEditForm: function(){
    var that = this;
    var editView = new Sonichunt.Views.CommentForm({
      model: that.model
    });
    that.addSubview(".edit-comment-"+that.model.id, editView);
  },

  events: {
    "click button.edit-comment-button": "displayEditForm",
    "click .comment-delete": "destroyComment"
  },

  destroyComment: function(){
    event.preventDefault();
    this.model.destroy();
  },

  displayEditForm: function(){
    $(".edit-comment-"+ this.model.escape('id')).show();
  }
});
