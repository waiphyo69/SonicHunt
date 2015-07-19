Sonichunt.Views.Header = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(Sonichunt.currentUser, "signIn signOut", this.render);
    this.render();
  },

  className: "head group",

  events: {
    "click #sign-out-link": "signOut",
    "click .guest-login": "guestLogin"
  },

  guestLogin: function(event){
    event.preventDefault();

    Sonichunt.currentUser.signIn({
      username: "bob123",
      password: "bob123"
    });
  },

  template: JST['shared/header'],

  render: function(){
    var html = this.template({ currentUser: Sonichunt.currentUser });
    this.$el.html(html);

    return this;
  },

  signOut: function(event){
    event.preventDefault();
    Sonichunt.currentUser.signOut({
      success: function(){
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }

});
