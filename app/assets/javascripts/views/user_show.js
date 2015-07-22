
Sonichunt.Views.UserShow = Backbone.CompositeView.extend({

  className: "user-show group",

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.follow(), "sync change", this.render);
    this.listenTo(this.model.reviews(), "sync change", this.render);
    this.listenTo(this.model.gears(), "sync change", this.render);
    this.listenTo(this.model.collections(), "sync change", this.render);
    this.listenTo(this.model.followers(), "sync change remove", this.render);
    this.listenTo(this.model.followees(), "sync change remove", this.render);
    this.listenTo(this.model.followers(), "remove", this.removeFollower);
    this.listenTo(this.model.followees(), "remove", this.removeFollowee);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.listenTo(this.model.gears(), "add", this.addGear);
    this.listenTo(this.model.collections(), "add", this.addCollection);
    this.listenTo(this.model.followers(), "add", this.addFollower);
    this.listenTo(this.model.followees(), "add", this.addFollowee);
    this.model.reviews().each(this.addReview.bind(this));
    this.model.gears().each(this.addGear.bind(this));
    this.model.collections().each(this.addCollection.bind(this));
    this.model.followers().each(this.addFollower.bind(this));
    this.model.followees().each(this.addFollowee.bind(this));
    this.addImageEditView();
    $(document).on("click","#search", function(){
      if (Sonichunt.router._currentView.className === "user-show group") {
        Backbone.history.navigate("", { trigger: true });
      }
    })
  },

  template: JST['users/show'],

  events: {
    "click a.reviews": "displayReviews",
    "click a.collections": "displayCollections",
    "click a.gears": "displayGears",
    "click a.followers": "displayFollowers",
    "click a.followees": "displayFollowees",
    "click .show-follow-button": "toggleFollow",
    "click .edit-pic": "displayImageEditForm",
    "click .cancel-image": "hideImageEditForm",
  },

  displayImageEditForm: function(){
    event.preventDefault();
    $("edit-image").show();
    $(".edit-pic").hide();
  },

  hideImageEditForm: function(){
    $("edit-image").hide();
    $(".edit-pic").show();
  },


  addImageEditView: function(){
    var imageEditView = new Sonichunt.Views.UserImageForm({
      model: this.model
    });
    this.addSubview("edit-image", imageEditView)
  },

  removeFollower: function (follower) {
    this.removeModelSubview(".followers", follower)
  },

  removeFollowee: function (followee) {
    this.removeModelSubview(".followees", followee)
  },

  displayReviews: function(event){
    event.preventDefault();
    $(".user-stuff-container div:not(.user-reviews-container)").hide();
    $("div.user-reviews-container").show();
  },

  displayGears: function(event){
    event.preventDefault();
    $(".user-stuff-container div:not(.user-gears-container)").hide();
    $("div.user-gears-container").show();
    $(".add-gear").css("display","inline");
  },

  displayCollections: function(event){
    event.preventDefault();
    $(".user-stuff-container div:not(.user-collections-container)").hide();
    $("div.user-collections-container").show();
  },

  displayFollowers: function(event){
    event.preventDefault();
    $(".user-stuff-container div:not(.user-followers-container)").hide();
    $("div.user-followers-container").show();
    $("div.follow").show();
  },

  displayFollowees: function(event){
    event.preventDefault();
    $(".user-stuff-container div:not(.user-followees-container)").hide();
    $("div.user-followees-container").show();
    $("div.follow").show();
    $("div.follow div").show();
  },

  addReview: function(review){
    var that = this;
    review.fetch({
      success: function(){
        var reviewItemView = new Sonichunt.Views.ReviewItem({model: review});
        that.addSubview("ul.user-reviews", reviewItemView);
      }
    })
  },

  addGear: function(gear){
    var that = this;
    gear.fetch({
      success: function(){
        var gearItemView = new Sonichunt.Views.GearItem({model: gear});
        that.addSubview("ul.user-gears", gearItemView);
      }
    })
  },

  addCollection: function(collection){
    var collectionItemView = new Sonichunt.Views.CollectionItem({model: collection});
    this.addSubview("ul.user-collections", collectionItemView);
  },

  addFollower: function(follower){
    var that = this;
    follower.fetch({
      success: function(){
          var followerItemView = new Sonichunt.Views.UserItem({model: follower, collection: that.model.followers()});
          that.addSubview("ul.user-followers", followerItemView);
      }
    });
  },

  addFollowee: function(followee){
    var that = this;
    followee.fetch({
      success: function(){
        var followeeItemView = new Sonichunt.Views.UserItem({model: followee, collection: that.model.followees()});
        that.addSubview("ul.user-followees", followeeItemView);
      }
    })
  },
  createFollow: function () {
    var that = this;
    this.model.follow().set({
      follower_id: Sonichunt.currentUser.id,
      followee_id: parseInt(that.model.escape('id'))
    });
    this.model.follow().save();
  },

  destroyFollow: function () {
    this.model.follow().destroy({
      success: function(model){
        model.unset("id");
      }
    });
  },

  toggleFollow: function (event) {
    event.preventDefault();
    if (this.model.follow().isNew()) {
      this.createFollow();
    } else {
      this.destroyFollow();
    }
  },


  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);
    this.attachSubviews();
    return this;
  }

});
