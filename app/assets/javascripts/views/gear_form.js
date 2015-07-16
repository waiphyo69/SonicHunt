Sonichunt.Views.GearForm = Backbone.CompositeView.extend({

  template: JST["gears/form"],

  className: "gear-form",

  tagName: "form",

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
    if ( this.model.isNew() ) {
      this.headphones = this.collection.where({category: "Headphones"})
      this.dacs = this.collection.where({category: "DAC"})
      this.amplifiers = this.collection.where({category: "Amplifier"})
    }
  },


  events: {
  "click .submit": "submit",
  "click .cancel": "cancel"
  },

  cancel: function(){
    event.preventDefault();
    $(".new-gear-button").css("display", "inline")
    $(".edit-gear-button").css("display", "inline")
    if ( this.model.isNew() ) {
      $(".new-gear").css("display","none");
    } else {
      $(".edit-gear-"+this.model.escape('id')).css("display","none");
    }
  },

  submit: function(){
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    if (this.model.isNew()) {
      $(".new-gear-button").css("display", "inline")
      $(".new-gear").css("display","none");
      attrs["owner_id"] = parseInt(attrs["owner_id"]);
      this.model.set(attrs);
      this.model.save({},{
        success: function(){
          that.collection.add(that.model, {merge: true});
          var headphone = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: $("#headphones option:selected").data("id") });
          var dac = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: $("#dacs option:selected").data("id") });
          var amplifier = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: $("#amplifiers option:selected").data("id") });
          headphone.save();
          dac.save();
          amplifier.save();
          Backbone.history.navigate("#/gears/"+that.model.escape('id'), {trigger: true});
        }
      });
    }
    else {
      $(".edit-gear-button").css("display", "inline")
      $(".edit-gear-"+this.model.escape('id')).css("display","none");
      this.model.set(attrs);
      this.model.save({}, {success: function(){
        Backbone.history.navigate("#/gears/"+that.model.escape('id'), {trigger: true});
        }
      })
    }
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
