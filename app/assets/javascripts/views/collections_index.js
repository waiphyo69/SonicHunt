Sonichunt.Views.CollectionsIndex = Backbone.CompositeView.extend({
  template: JST["collections/index"],

  className: "collections-container group",

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
    "click a.gears": "removeSelf"
  },

  removeSelf: function(){
    this.remove();
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
      if ( collection.get('title').toLowerCase().includes(input) ||

      collection.get('product_names').split('$$').some(function (elem)
      { return elem.toLowerCase().includes(input) }) ||

      collection.get('gear_names').split('$$').some(function (elem)
      { return elem.toLowerCase().includes(input) })){

        newCollections.add(collection);
        
      }
    });

    var searchView = new Sonichunt.Views.CollectionsIndex({
      collection: newCollections
    });
    if (Sonichunt.router._currentView.className === "collections-container group") {
      Sonichunt.router.swapView(searchView);
    }
  }, 500 )
})
