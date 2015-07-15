Sonichunt.Routers.Router = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $("#main");
    this.products = Sonichunt.products;
    this.gears = Sonichunt.gears;
    this.collections = Sonichunt.collections;
    this.reviews = new Sonichunt.Collections.Reviews();
  },

  routes: {
    "": "index",
    "products/:id": "productShow",
    "reviews/:id": "reviewShow",
    "gears/:id": "gearShow",
    "collections/:id": "collectionShow"
  },

  index: function(){
    this.products.fetch();
    this.gears.fetch();
    this.collections.fetch();
    var rootView = new Sonichunt.Views.RootView({
      products: this.products,
      gears: this.gears,
      collections: this.collections
    });
    this.swapView(rootView);
  },

  productShow: function(id){
    var product = this.products.getorFetch(id);
    var productShowView = new Sonichunt.Views.ProductShow({
      model: product
    });
    this.swapView(productShowView);
  },

  reviewShow: function(id){
    var review = this.reviews.getorFetch(id);
    var reviewShowView = new Sonichunt.Views.ReviewShow({
      model: review
    });
    this.swapView(reviewShowView);
  },

  gearShow: function(id){
    var gear = this.gears.getorFetch(id);
    var gearShowView = new Sonichunt.Views.GearShow({
      model: gear
    });
    this.swapView(gearShowView);
  },

  collectionShow: function(id){
    var collection = this.collections.getorFetch(id);
    var collectionShowView = new Sonichunt.Views.CollectionShow({
      model: collection
    });
    this.swapView(collectionShowView);
  },

  swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
