Sonichunt.Views.CollectionsIndex = Backbone.CompositeView.extend({
  template: JST["collections/index"],

  className: "collections-container",

  initialize: function(){
    var that = this;
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, "remove", this.removeCollection)
    this.listenTo(this.collection, "add", this.addCollection);
    this.collection.each(this.addCollection.bind(this));
    $("#search").keyup(function(){
          that.renderSearch();
    })
  },

  events: {
    "click a.products": "removeSelf",
    "click a.collections": "removeSelf"
  },

  removeSelf: function(){
    this.remove();
    this.unbind();
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
  },

  renderSearch: _.throttle( function(){
    var input = $("#search").val();
    newCollections = new Sonichunt.Collections.Collections();
    Sonichunt.collections.each(function (collection){
      if ( collection.get('title').toLowerCase().includes(input) ){
        newCollections.add(collection);
      }
    });

    var searchView = new Sonichunt.Views.CollectionsIndex({
      collection: newCollections
    });
    Sonichunt.router.swapView(searchView);
  }, 500 )
})
