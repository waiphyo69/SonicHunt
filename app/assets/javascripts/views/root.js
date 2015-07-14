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
  },


  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview(".products", productItemView);
  },

  addGear: function(gear){
    var gearItemView = new Sonichunt.Views.GearItem({model: gear});
    this.addSubview(".gears", gearItemView);
  },

  addCollection: function(collection){
    var collectionItemView = new Sonichunt.Views.CollectionItem({model: collection});
    this.addSubview(".collections", collectionItemView);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }


})
