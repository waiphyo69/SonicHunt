Sonichunt.Models.Product = Backbone.Model.extend({
  urlRoot: "/api/products",

  reviews: function () {
    this._reviews = this._reviews ||
      new Sonichunt.Collections.Reviews([], { product: this });
    return this._reviews;
    },


  parse: function (response) {
    if (response.reviews) {
      this.reviews().set(response.reviews);
      delete response.reviews;
    }
    return response;
  }
})
