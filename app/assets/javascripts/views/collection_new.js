Sonichunt.Views.CollectionNew = Backbone.CompositeView.extend({
  template: JST["collections/new"],

  className: "add-to-collection",

  initialize: function(){
    this.collections = this.collection.where({owner_id: currentUser.id});
  },

  render: function(){
    var content = this.template({
      collection: this.collections
    });
    this.$el.html(content);
    return this;
  }
})
