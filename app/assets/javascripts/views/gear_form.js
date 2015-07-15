Sonichunt.Views.gearForm = Backbone.CompositeView.extend({

  template: JST["gears/form"],

  className: "gear-form",

  tagName: "form",

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
    var that = this;
    Sonichunt.products.fetch({
      success: function(){
        that.headphones = Sonichunt.products.where({category: "Headphones"})
        that.dacs = Sonichunt.products.where({category: "DAC"})
        that.amplifiers = Sonichunt.products.where({category: "Amplifier"})
      }
    })
  },

  events: {
  "click .submit": "submit",
  "click .cancel": "cancel"
  },

  cancel: function(){
    $(".new-gear").css("display","none");
  },

  submit: function(){
    $(".new-gear").css("display","none");
    var that = this;
    var attrs = this.$el.serializeJSON();
    attrs["owner_id"] = parseInt(attrs["owner_id"]);
    this.model.set(attrs);
    this.model.save({},{
      success: function(){
        that.collection.add(that.model, {merge: true});
      }
    });
    var headphone = new Backbone.Model.GearToPro({ gear_id: this.model.escape('id'), product_id: $("#headphones option:selected").data("id") });
    var dac = new Backbone.Model.GearToPro({ gear_id: this.model.escape('id'), product_id: $("#dacs option:selected").data("id") })
    var amplifier = new Backbone.Model.GearToPro({ gear_id: this.model.escape('id'), product_id: $("#amplifiers option:selected").data("id") })
  },

  render: function(){
    var content = this.template({
      gear: this.model,
      headphones: this.headphones,
      dacs: this.products,
      amplifiers: this.amplifiers
    )};
    this.$el.html(content);
    return this;
  }
})
