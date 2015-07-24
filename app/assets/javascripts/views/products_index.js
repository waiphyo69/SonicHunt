Sonichunt.Views.ProductsIndex = Backbone.CompositeView.extend({
  template: JST["products/index"],

  className: "products-container",

  initialize: function(){
    var that = this;
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, "add", this.addProduct);
    this.collection.each(this.addProduct.bind(this));
    $("#search").keyup(function(){
          that.renderSearch();
    })
  },

  events: {
    "click a.gears": "removeSelf",
    "click a.collections": "removeSelf"
  },

  removeSelf: function(){
    this.remove();
  },


  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview("ul.products", productItemView);
    productItemView.$el.append('<button class="add-product">+</button>');
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
    Sonichunt.products.each(function (product){
      if ( product.get('name').toLowerCase().includes(input) || product.get('category').toLowerCase().includes(input)){
        newProducts.add(product);
      }
    });


    var searchView = new Sonichunt.Views.ProductsIndex({
      collection: newProducts
    });
    if (Sonichunt.router._currentView.className === "products-container") {
      Sonichunt.router.swapView(searchView);
    }
  }, 500 )
})
