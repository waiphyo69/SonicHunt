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
  "click .cancel": "cancel",
  "change #input-post-image": "fileInputChange"
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
    var headphone_id = $("#headphones option:selected").data("id");
    var dac_id = $("#dacs option:selected").data("id");
    var amplifier_id = $("#amplifiers option:selected").data("id");
    var that = this;
    var attrs = this.$el.serializeJSON();
    var file = this.$("#input-gear-image")[0].files[0];
    if (this.model.isNew()) {
      $(".new-gear-button").css("display", "inline")
      $(".new-gear").css("display","none");
      attrs["owner_id"] = Sonichunt.currentUser.id;
      var formData = new FormData();
      formData.append("gear[title]", attrs["title"]);
      formData.append("gear[image]", file);
      formData.append("gear[impression]", attrs["impression"]);
      formData.append("gear[owner_id]" , Sonichunt.currentUser.id);
      that.model.saveFormData(formData,{
        success: function(){
          var headphone = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: headphone_id });
          var dac = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: dac_id });
          var amplifier = new Sonichunt.Models.GearToPro({ gear_id: parseInt(that.model.escape('id')), product_id: amplifier_id });
          that.collection.add(that.model, {merge: true});
          headphone.save();
          dac.save();
          amplifier.save();
          alert("Successfully created your gear bro!");
          Backbone.history.navigate("#/gears/"+that.model.escape('id'), {trigger: true});
        }, error: function(){
          alert("Input is invalid! Try again!");
        }
      });
    }
    else {
      $(".edit-gear-button").css("display", "inline")
      $(".edit-gear-"+this.model.escape('id')).css("display","none");
      this.model.set(attrs);
      this.model.save({}, {success: function(){
        alert("Successfully updated your impressions!");
        Backbone.history.navigate("#/gears/"+that.model.escape('id'), {trigger: true});
        },error: function(){
          alert("Input is invalid! Try again!");
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
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }
})
