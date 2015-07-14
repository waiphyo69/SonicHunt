Sonichunt.Collections.Products = Backbone.Collection.extend({
  url: "/api/products",

  model: Sonichunt.Models.Product,

  comparator: function(product) {
    return product.get('avg_score');
  },

  // initialize: function(models,options){
  //   this.gear = options.gear;
  // },

  getorFetch: function(id){
    var products = this;
    var product = this.get(id);
    if (product){
      product.fetch();
    } else {
      var product = new Sonichunt.Models.Product({id: id});
      product.fetch({
        success: function(){
          products.add(product)
        }
      })
    }
    return product;
  }
})
Sonichunt.products = new Sonichunt.Collections.Products();
