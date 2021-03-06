Sonichunt.Models.Gear = Backbone.Model.extend({
  urlRoot: "/api/gears",

  upvote: function(){
    if (!this._upvote) {
      this._upvote = new Sonichunt.Models.GearToUser();
    }
    return this._upvote;
  },

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

  upvoters: function () {
    this._upvoters = this._upvoters ||
      new Sonichunt.Collections.Users([], { gear: this });
    return this._upvoters;
    },

  toJSON: function(){
    var json = {gear: _.clone(this.attributes)};
    return json;
  },

  saveFormData: function(formData, options){
  var method = this.isNew() ? "POST" : "PUT";
  var model = this;

  $.ajax({
    url: _.result(model, "url"),
    type: method,
    data: formData,
    processData: false,
    contentType: false,
    success: function(resp){
      model.set(model.parse(resp));
      model.trigger('sync', model, resp, options);
      options.success && options.success(model, resp, options);
    },
    error: function(resp){
      options.error && options.error(model, resp, options);
      }
    });
  },

  parse: function (response) {
    if (response.upvote) {
      this.upvote().set(response.upvote);
      delete response.upvote;
      }
    if (response.upvoters) {
        this.upvoters().set(response.upvoters);
        delete response.upvoters;
        }
    if (response.products && response.comments) {
      this.comments().set(response.comments);
      this.products().set(response.products);
      delete response.products;
      delete response.comments;
    }
    return response;
  }
})
