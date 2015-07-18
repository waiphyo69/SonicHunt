Sonichunt.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
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

  parse: function (response) {
    if (response.gears && response.reviews && response.collections) {
      this.reviews().set(response.reviews);
      this.gears().set(response.gears);
      this.collections().set(response.collections);
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
      console.log("currentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
    }
  }

});
