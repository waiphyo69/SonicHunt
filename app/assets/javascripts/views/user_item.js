Sonichunt.Views.UserItem = Backbone.CompositeView.extend({

  template: JST["users/item"],

  tagName: "li",

  className: "user-item",

  initialize: function(){
    this.listenTo( this.model, "sync change", this.render );
  },


  render: function(){
   var content = this.template({ user: this.model });
   this.$el.html(content);
   return this;
  }

})
