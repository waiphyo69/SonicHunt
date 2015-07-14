Sonichunt.Models.Gear = Backbone.Model.extend({
  urlRoot: "/api/gears",
  products: function() {
    this._products = this._products ||
      new Sonichunt.Collections.Products([], { gear: this });
    return this._products;
    },


  parse: function (response) {
    if (response.products) {
      this.products().set(response.products);
      delete response.products;
    }
    return response;
  }
})
