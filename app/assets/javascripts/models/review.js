Sonichunt.Models.Review = Backbone.Model.extend({
  urlRoot: "/api/reviews",

  upvote: function(){
    if (!this._upvote) {
      this._upvote = new Sonichunt.Models.ReviewToUser();
    }
    return this._upvote;
  },

  comments: function () {
    this._comments = this._comments ||
      new Sonichunt.Collections.Comments([], { review: this });
    return this._comments;
    },

  parse: function (response) {
    if (response.upvote) {
      this.upvote().set(response.upvote);
      delete response.upvote;
      }
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    return response;
  }
})
