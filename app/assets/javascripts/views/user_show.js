
Sonichunt.Views.UserShow = Backbone.CompositeView.extend({

  className: "user-show group",

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.reviews(), "sync change", this.render);
    this.listenTo(this.model.gears(), "sync change", this.render);
    this.listenTo(this.model.collections(), "sync change", this.render);
    this.listenTo(this.model.followers(), "sync change", this.render);
    this.listenTo(this.model.followees(), "sync change", this.render);
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
  },

  template: JST['users/show'],

  events: {
    "click a.reviews": "displayReviews",
    "click a.collections": "displayCollections",
    "click a.gears": "displayGears",
    "click a.followers": "displayFollowers",
    "click a.followees": "displayFollowees",
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
  },

  displayFollowees: function(event){
    event.preventDefault();
    $(".user-stuff-container div:not(.user-followees-container)").hide();
    $("div.user-followees-container").show();
  },

  addReview: function(review){
    var reviewItemView = new Sonichunt.Views.ReviewItem({model: review});
    this.addSubview("ul.user-reviews", reviewItemView);
  },

  addGear: function(gear){
    var gearItemView = new Sonichunt.Views.GearItem({model: gear});
    this.addSubview("ul.user-gears", gearItemView);
  },

  addCollection: function(collection){
    var collectionItemView = new Sonichunt.Views.CollectionItem({model: collection});
    this.addSubview("ul.user-collections", collectionItemView);
  },

  addFollower: function(follower){
    var followerItemView = new Sonichunt.Views.UserItem({model: follower});
    this.addSubview("ul.user-followers", followerItemView);
  },

  addFollowee: function(followee){
    var followeeItemView = new Sonichunt.Views.UserItem({model: followee});
    this.addSubview("ul.user-followees", followeeItemView);
  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);
    this.attachSubviews();
    return this;
  }

});
