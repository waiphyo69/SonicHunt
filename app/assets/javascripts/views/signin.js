Sonichunt.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Sonichunt.currentUser, "signIn", this.signInCallback);
  },

  className: "SignIn",

  events: {
    "click .sign-in-button": "submit",
    "click button.demo-user": "guestLogin"
  },

  guestLogin: function(event){
    event.preventDefault();

    Sonichunt.currentUser.signIn({
      username: "bob123",
      password: "bob123"
    });
  },

  template: JST['shared/signin'],

  render: function(){
    this.$el.html(this.template());

    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    Sonichunt.currentUser.signIn({
      username: formData.username,
      password: formData.password,
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    });
  }
  //
  //
  // signInCallback: function(event){
  //   if(this.callback) {
  //     this.callback();
  //   } else {
  //     Backbone.history.navigate("#/products", { trigger: true });
  //   }
  // }

});
