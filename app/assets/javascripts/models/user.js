Sonichunt.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  },

  follow: function () {
    if (!this._follow) {
      this._follow = new Sonichunt.Models.Follow();
    }
    return this._follow;
  },

  gears: function() {
    this._gears = this._gears ||
      new Sonichunt.Collections.Gears([], { user: this });
    return this._gears;
    },

  reviews: function () {
    this._reviews = this._reviews ||
      new Sonichunt.Collections.Reviews([], { user: this });
    return this._reviews;
    },

  collections: function () {
    this._collections = this._collections ||
      new Sonichunt.Collections.Collections([], { user: this });
    return this._collections;
    },

  followers: function () {
    this._followers = this._followers ||
      new Sonichunt.Collections.Users([], { followee: this });
    return this._followers;
  },


  followees: function () {
    this._followees = this._followees ||
      new Sonichunt.Collections.Users([], { follower: this });
    return this._followees;
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
    if (response.follow) {
      this.follow().set(response.follow);
      delete response.follow;
    }
    if (response.gears && response.reviews && response.collections &&
        response.followers && response.followees) {
      this.reviews().set(response.reviews);
      this.gears().set(response.gears);
      this.collections().set(response.collections);
      this.followers().set(response.followers);
      this.followees().set(response.followees);
      delete response.gears;
      delete response.reviews;
      delete response.collections;
    }
    return response;
  }
});

Sonichunt.Models.CurrentUser = Sonichunt.Models.User.extend({

  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[username]": options.username,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
        Backbone.history.navigate("#/products", {trigger: true})
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  }

});
