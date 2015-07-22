Sonichunt.Views.UserForm = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['users/form'],

  className: "SignUp",

  events: {
    "click .sign-up-button": "submit",
    "click button.demo-user": "guestLogin"
  },

  guestLogin: function(event){
    event.preventDefault();

    Sonichunt.currentUser.signIn({
      username: "bob123",
      password: "bob123"
    });
  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  },

  submit: function(event){
    event.preventDefault();

    var $form = $(".form-fieldset");
    var userData = $form.serializeJSON().user;
    var that = this;

    this.model.set(userData);

    this.model.save({}, {
      success: function(){
        Sonichunt.currentUser.fetch();
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("#/products", { trigger: true });

      },
      error: function(data){

        alert("Invalid username and/or email and/or password. Please try again");

      }
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("#/products", { trigger: true });
    }
  }

});
