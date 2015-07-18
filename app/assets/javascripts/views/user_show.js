
Sonichunt.Views.UserShow = Backbone.CompositeView.extend({

  className: "user-show group",

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.reviews(), "sync change", this.render);
    this.listenTo(this.model.gears(), "sync change", this.render);
    this.listenTo(this.model.collections(), "sync change", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.listenTo(this.model.gears(), "add", this.addGear);
    this.listenTo(this.model.collections(), "add", this.addCollection);
    this.model.reviews().each(this.addReview.bind(this));
    this.model.gears().each(this.addGear.bind(this));
    this.model.collections().each(this.addCollection.bind(this));
  },

  template: JST['users/show'],

  events: {
    "click a.reviews": "displayReviews",
    "click a.collections": "displayCollections",
    "click a.gears": "displayGears",
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

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);
    this.attachSubviews();
    return this;
  }

});
