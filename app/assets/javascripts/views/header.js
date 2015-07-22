Sonichunt.Views.Header = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(Sonichunt.currentUser, "signIn signOut", this.render);
    this.render();
    $(document).on("click","#search", function(){
        $("#search").animate({"width": "560px"})
    });
    $(document).click(function(e) {

				var target = e.target;

				if ( $(target).attr("id") != "search" ){
          $("#search").animate({"width": "200px"});
				}
      });
      $(document).click(function(e) {

          var target = e.target;

          if ( $(".user-dropdown").css("display") === "block" &&
          !$(target).parents().is(".user-dropdown") &&
          $(target).attr("class") != "svg" &&
          $(target).attr("class") != "profile-pic-thumb"){

              $('.user-dropdown').hide();

        }
      });
  },

  className: "head group",

  events: {
    "click #sign-out-link": "signOut",
    "click .guest-login": "guestLogin",
    "click .svg": "showdropDown",
    "click .profile-pic-thumb": "showdropDown"
  },


  showdropDown: function(){
    $('.user-dropdown').show();
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
