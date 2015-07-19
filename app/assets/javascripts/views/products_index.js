Sonichunt.Views.ProductsIndex = Backbone.CompositeView.extend({
  template: JST["products/index"],

  className: "products-container",

  initialize: function(){
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, "add", this.addProduct);
    this.collection.each(this.addProduct.bind(this));
  },


  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview("ul.products", productItemView);
    productItemView.$el.append("<button class='add-product'>Add To Collection</button>");
  },


  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
