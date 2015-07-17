Sonichunt.Routers.Router = Backbone.Router.extend({
  initialize: function(){
    this.$rootEl = $("#main");
    this.products = Sonichunt.products;
    this.gears = Sonichunt.gears;
    this.collections = Sonichunt.collections;
    this.reviews = new Sonichunt.Collections.Reviews();
    this.users = new Sonichunt.Collections.Users();
    },

  routes: {
    "": "index",
    "reviews/new": "newReview",
    "products/:id": "productShow",
    "reviews/:id": "reviewShow",
    "gears/:id": "gearShow",
    "collections/:id": "collectionShow",
    "users/new": "new",
    "users/:id": "show",
    "session/new": "signin"
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

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new Sonichunt.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
    if (!Sonichunt.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (Sonichunt.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },



  swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
