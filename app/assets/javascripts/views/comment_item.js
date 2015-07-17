Sonichunt.Views.CommentItem = Backbone.CompositeView.extend({

  tagName: "li",

  template: JST["comments/item"],

  initialize: function(){
    this.listenTo(this.model,"sync add", this.render);
    this.addEditForm();
  },

  render: function(){
    var content = this.template({comment: this.model});
    this.$el.html(content);
    return this;
  },

  addEditForm: function(){
    var comment = new Sonichunt.Collections.Comments().getorFetch(this.model.id);
    var editView = new Sonichunt.Views.CommentForm({
      model: comment
    });
    this.addSubview(".edit-comment-"+this.model.id, editView);
  },

  events: {
    "click button.edit-comment-button": "displayEditForm",
    "click .comment-delete": "destroyComment"
  },

  destroyComment: function(){
    event.preventDefault();
    this.model.destroy();
    alert("Comment successfully deleted!")
  },

  displayEditForm: function(){
    $(".edit-comment-"+ this.model.escape('id')).show();
  }
});
