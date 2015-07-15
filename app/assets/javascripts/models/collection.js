Sonichunt.Models.Collection = Backbone.Model.extend({
  urlRoot: "/api/collections",
  products: function() {
    this._products = this._products ||
      new Sonichunt.Collections.Products([], { collection: this });
    return this._products;
    },

  gears: function() {
    this._gears = this._gears ||
      new Sonichunt.Collections.Gears([], { collection: this });
    return this._gears;
    },

  parse: function (response) {
    if (response.products && response.gears) {
      this.products().set(response.products);
      this.gears().set(response.gears)
      delete response.products;
    }
    return response;
  }
})
