Sonichunt.Views.CollectionNew = Backbone.CompositeView.extend({
  template: JST["collections/new"],

  className: "add-to-collection",

  events: {
    "click a" :"addStuffToCollection",
    "click .new": "makeNewCollection"
  },

  initialize: function(){
    this.collections = this.collection.where({owner_id: currentUser.id});
  },

  

  render: function(){
    var content = this.template({
      collection: this.model
    });
    this.$el.html(content);
    return this;
  }
})
