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
    "": "productsIndex",
    "collections": "collectionsIndex",
    "gears": "gearsIndex",
    "reviews/new": "newReview",
    "users/new": "userNew",
    "products/:id": "productShow",
    "reviews/:id": "reviewShow",
    "gears/:id": "gearShow",
    "collections/:id": "collectionShow",
    "users/:id": "userShow",
    "session/new": "signIn"
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

  productsIndex: function(){
    this.products.fetch();
    var productsIndexView = new Sonichunt.Views.ProductsIndex({
      collection: this.products
    });
    this.swapView(productsIndexView);
  },

  collectionsIndex: function(){
    this.collections.fetch();
    var collectionsIndexView = new Sonichunt.Views.CollectionsIndex({
      collection: this.collections
    });
    this.swapView(collectionsIndexView);
  },

  gearsIndex: function(){
    this.gears.fetch();
    var gearsIndexView = new Sonichunt.Views.GearsIndex({
      collection: this.gears
    });
    this.swapView(gearsIndexView);
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
    var that = this;
    this.collections.fetch({success: function(){
      var collection = that.collections.getorFetch(id);
      var collectionShowView = new Sonichunt.Views.CollectionShow({
        model: collection
      });
      that.swapView(collectionShowView);
      }
    })
  },


  userNew: function(){
      var user = new this.users.model();
      var formView = new Sonichunt.Views.UserForm({
        collection: this.users,
        model: user
      });
      this.swapView(formView);
    },


  userShow: function(id){
      var callback = this.userShow.bind(this, id);
      if (!this._requireSignedIn(callback)) { return; }
      var user = this.users.getorFetch(id);
      var showView = new Sonichunt.Views.UserShow({
        model: user
      });
      this.swapView(showView);
    },


  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }
    var signInView = new Sonichunt.Views.SignIn({
      callback: callback
    });
    this.swapView(signInView);
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
