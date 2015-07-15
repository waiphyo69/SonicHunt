Sonichunt.Views.GearForm = Backbone.CompositeView.extend({

  template: JST["gears/form"],

  className: "gear-form",

  tagName: "form",

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
    this.headphones = this.collection.where({category: "Headphones"})
    this.dacs = this.collection.where({category: "DAC"})
    this.amplifiers = this.collection.where({category: "Amplifier"})
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
        debugger
        var headphone = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: $("#headphones option:selected").data("id") });
        var dac = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: $("#dacs option:selected").data("id") });
        var amplifier = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: $("#amplifiers option:selected").data("id") });
        headphone.save();
        dac.save();
        amplifier.save();
      }
    });
  },

  render: function(){
    var content = this.template({
      gear: this.model,
      headphones: this.headphones,
      dacs: this.dacs,
      amplifiers: this.amplifiers
    });
    this.$el.html(content);
    return this;
  }
})
