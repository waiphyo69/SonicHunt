window.Sonichunt = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Sonichunt.currentUser = new Sonichunt.Models.CurrentUser();
    Sonichunt.header = new Sonichunt.Views.Header({ el: "#header" });
    Sonichunt.currentUser.fetch({success: function(){
      Sonichunt.router = new Sonichunt.Routers.Router();
      Backbone.history.start();
    }});
  }
};
