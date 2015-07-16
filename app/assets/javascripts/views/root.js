Sonichunt.Views.RootView = Backbone.CompositeView.extend({
  template: JST["root/index"],

  initialize: function (options){
    this.products = options.products;
    this.gears = options.gears;
    this.collections = options.collections;
    this.listenTo(this.products, "sync", this.render);
    this.listenTo(this.gears, "sync", this.render);
    this.listenTo(this.collections, "sync", this.render);
    this.listenTo(this.products, "add", this.addProduct);
    this.listenTo(this.gears, "add", this.addGear);
    this.listenTo(this.collections, "add", this.addCollection);
    this.products.each(this.addProduct.bind(this));
    this.gears.each(this.addGear.bind(this));
    this.collections.each(this.addCollection.bind(this));
    this.addGearNewForm();
  },

  events: {
    "click a.products": "displayProducts",
    "click a.collections": "displayCollections",
    "click a.gears": "displayGears",
    "click .new-gear-button": "displayNewGearForm"
  },

  displayNewGearForm: function(){
    $(".new-gear").css("display","block");
    $(".new-gear-button").css("display", "none");
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


  displayProducts: function(){
    $("div.collection-container").css("display", "none");
    $("div.gear-container").css("display", "none");
    $("div.product-container").css("display", "block");
  },

  displayGears: function(){
    $("div.product-container").css("display", "none");
    $("div.collection-container").css("display", "none");
    $("div.gear-container").css("display", "block");
  },

  displayCollections: function(){
    $("div.gear-container").css("display", "none");
    $("div.product-container").css("display", "none");
    $("div.collection-container").css("display", "block");
  },


  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview("ul.products", productItemView);
  },

  addGear: function(gear){
    var gearItemView = new Sonichunt.Views.GearItem({model: gear});
    this.addSubview("ul.gears", gearItemView);
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
