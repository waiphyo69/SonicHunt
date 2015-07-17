Sonichunt.Models.Gear = Backbone.Model.extend({
  urlRoot: "/api/gears",

  products: function() {
    this._products = this._products ||
      new Sonichunt.Collections.Products([], { gear: this });
    return this._products;
    },

  comments: function () {
    this._comments = this._comments ||
      new Sonichunt.Collections.Comments([], { gear: this });
    return this._comments;
    },

  parse: function (response) {
    if (response.products && response.comments) {
      this.comments().set(response.comments);
      this.products().set(response.products);
      delete response.products;
      delete response.comments;
    }
    return response;
  }
})
