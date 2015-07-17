Sonichunt.Models.Review = Backbone.Model.extend({
  urlRoot: "/api/reviews",

  comments: function () {
    this._comments = this._comments ||
      new Sonichunt.Collections.Comments([], { review: this });
    return this._comments;
    },

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    return response;
  }
})
