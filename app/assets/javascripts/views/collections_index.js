Sonichunt.Views.CollectionsIndex = Backbone.CompositeView.extend({
  template: JST["collections/index"],

  className: "collections-container",

  initialize: function(){
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, "remove", this.removeCollection)
    this.listenTo(this.collection, "add", this.addCollection);
    this.collection.each(this.addCollection.bind(this));
  },

  removeCollection: function (collection) {
    this.removeModelSubview(".collections", collection)
  },


  addCollection: function(collection){
    var collectionItemView = new Sonichunt.Views.CollectionItem({model: collection});
    this.addSubview("ul.collections", collectionItemView);
  },


  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
