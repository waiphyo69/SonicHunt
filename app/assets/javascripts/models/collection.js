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
    if (response.products) {
      this.products().set(response.products);
      delete response.products;
    }
    else if (response.gears) {
      this.gears().set(response.gears);
      delete response.gears;
    }
    return response;
  }
})
