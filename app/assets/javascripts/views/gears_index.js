Sonichunt.Views.GearsIndex = Backbone.CompositeView.extend({
  template: JST["gears/index"],

  className: "gears-container",

  initialize: function(){
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, "add", this.addGear);
    this.listenTo(this.collection, "remove", this.removeGear)
    this.collection.each(this.addGear.bind(this));
    this.addGearNewForm();
  },


  events: {
    "click .new-gear-button": "displayNewGearForm"
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
  }
})
