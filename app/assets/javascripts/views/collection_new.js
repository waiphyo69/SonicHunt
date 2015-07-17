Sonichunt.Views.CollectionNew = Backbone.CompositeView.extend({

  template: JST["collections/new"],

  className: "collectionpopup",

  id: "coll",

  initialize: function(){
    this.collections = this.collection.where({owner_id: Sonichunt.currentUser.id});
  },

  render: function(){
    var content = this.template({
      collections: this.collections
    });
    this.$el.html(content);
    return this;
  }
})
