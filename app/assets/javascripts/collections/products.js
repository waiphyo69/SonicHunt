Sonichunt.Collections.Products = Backbone.Collection.extend({
  url: "api/products",

  model: Sonichunt.Models.Product,
  
  getorFetch: function(id){
    var products = this;
    var product = this.get(id);
    if (product){
      products.fetch(id);
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
