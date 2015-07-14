window.Sonichunt = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Sonichunt.Routers.Router();
    Backbone.history.start();
  }
};
