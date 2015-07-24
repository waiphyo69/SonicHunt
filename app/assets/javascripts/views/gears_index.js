Sonichunt.Views.GearsIndex = Backbone.CompositeView.extend({
  template: JST["gears/index"],

  className: "gears-container",

  initialize: function(){

    var that = this;
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, "add", this.addGear);
    this.listenTo(this.collection, "remove", this.removeGear)
    this.collection.each(this.addGear.bind(this));
    this.addGearNewForm();

    $("#search").keyup(function(){
        that.renderSearch();
    });
  },


  events: {
    "click .new-gear-button": "displayNewGearForm",
    "click a.products": "removeSelf",
    "click a.collections": "removeSelf"
  },

  removeSelf: function(){
    this.remove();
  },


  removeGear: function (gear) {
    this.removeModelSubview(".gears", gear)
  },

  displayNewGearForm: function(){
    $(".new-gear").show();
    $(".new-gear-button").hide();
  },

  addGearNewForm: function(){
    var that = this;
    var gear = new Sonichunt.Models.Gear();
    Sonichunt.products.fetch({success: function(){
      var gearNewView = new Sonichunt.Views.GearForm({
        collection: Sonichunt.products,
        model: gear
      });
    that.addSubview(".new-gear", gearNewView);
    }})
  },


  addGear: function(gear){
    var that = this;
    gear.fetch({
      success: function(){
        var gearItemView = new Sonichunt.Views.GearItem({model: gear});
        that.addSubview("ul.gears", gearItemView);
      }
    })
  },


  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderSearch: _.throttle( function(){
    var input = $("#search").val();
    newGears = new Sonichunt.Collections.Gears();
    Sonichunt.gears.each(function (gear){
      if ( gear.get('title').toLowerCase().includes(input) || gear.get('product_names').split('$$').some(function (elem) { return elem.toLowerCase().includes(input) }))
        {
        newGears.add(gear);
        }
    });

    var searchView = new Sonichunt.Views.GearsIndex({
      collection: newGears
    });
    if (Sonichunt.router._currentView.className === "gears-container") {
      Sonichunt.router.swapView(searchView);
    }
  }, 500 )
})
