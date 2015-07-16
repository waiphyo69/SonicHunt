Sonichunt.Views.CollectionNew = Backbone.CompositeView.extend({
  template: JST["collections/new"],

  initialize: function(){
    this.collections = this.collection.where({owner_id: parseInt(currentUser.id)});
  },

  render: function(){
    var content = this.template({
      collections: this.collections
    });
    this.$el.html(content);
    return this;
  }
})
