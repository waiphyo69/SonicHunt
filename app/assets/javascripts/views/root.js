Sonichunt.Views.RootView = Backbone.CompositeView.extend({
  template: JST["root/index"],

  initialize: function (options){
    var that = this;
    this.products = options.products;
    this.gears = options.gears;
    this.collections = options.collections;
    this.listenTo(this.products, "sync add", this.render);
    this.listenTo(this.gears, "sync change", this.render);
    this.listenTo(this.collections, "sync change", this.render);
    this.listenTo(this.gears, "remove", this.removeGear);
    this.listenTo(this.collections, "remove", this.removeCollection);;
    this.listenTo(this.products, "add", this.addProduct);
    this.listenTo(this.gears, "add", this.addGear);
    this.listenTo(this.collections, "add", this.addCollection);
    this.gears.each(this.addGear.bind(this));
    this.products.each(this.addProduct.bind(this));
    this.collections.each(this.addCollection.bind(this));
    this.addGearNewForm();
    $("#search").keyup(function(event){
      event.preventDefault();
      that.renderSearch();
    })
  },

  events: {
    "click a.products": "displayProducts",
    "click a.collections": "displayCollections",
    "click a.gears": "displayGears",
    "click .new-gear-button": "displayNewGearForm"
  },

  displayNewGearForm: function(){
    $(".new-gear").show();
    $(".new-gear-button").hide();
  },

  addGearNewForm: function(){
    var that = this;
    var gear = new Sonichunt.Models.Gear();
    this.products.fetch({success: function(){
      var gearNewView = new Sonichunt.Views.GearForm({
        collection: that.products,
        model: gear
      });
    that.addSubview(".new-gear", gearNewView);
    }})
  },


  displayProducts: function(event){
    event.preventDefault();
    $(".index div:not(.product-container)").hide();
    $("div.product-container").show();
    $(".add-product").css("display","inline");
  },

  displayGears: function(event){
    event.preventDefault();
    $(".index div:not(.gear-container)").hide();
    $(".new-gear-button").show();
    $("div.gear-container").show();
    $(".add-gear").css("display","inline");
  },

  displayCollections: function(event){
    event.preventDefault();
    $(".index div:not(.collection-container)").hide();
    $("div.collection-container").show();
  },


  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview("ul.products", productItemView);
    productItemView.$el.append("<button class='add-product'>Add To Collection</button>");
  },

  addGear: function(gear){
    var that = this;
    gear.fetch({
      success: function(){
        var gearItemView = new Sonichunt.Views.GearItem({model: gear});
        that.addSubview("ul.gears", gearItemView);
      }
    })
  },

  addCollection: function(collection){
    var collectionItemView = new Sonichunt.Views.CollectionItem({model: collection});
    this.addSubview("ul.collections", collectionItemView);
  },

  removeGear: function (gear) {
    this.removeModelSubview(".gears", gear)
  },

  removeCollection: function (collection) {
    this.removeModelSubview(".collections", collection)
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderSearch: _.throttle( function(){
    var input = $("#search").val();
    newProducts = new Sonichunt.Collections.Products();
    newGears = new Sonichunt.Collections.Gears();
    newCollections = new Sonichunt.Collections.Collections();

    Sonichunt.products.each(function (product){
      if ( product.get('name').toLowerCase().includes(input) ){
        newProducts.add(product);
      }
    });

    Sonichunt.gears.each(function (gear){
      if ( gear.get('title').toLowerCase().includes(input) ){
        newGears.add(gear);
      }
    });

    Sonichunt.collections.each(function (collection){
      if ( collection.get('title').toLowerCase().includes(input) ){
        newCollections.add(collection);
      }
    });

    var searchView = new Sonichunt.Views.RootView({
      products: newProducts,
      gears: newGears,
      collections: newCollections
    });
    Sonichunt.router.swapView(searchView);
  }, 500 )


})
