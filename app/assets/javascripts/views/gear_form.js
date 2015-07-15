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
    attrs["product_id"] = parseInt(attrs["product_id"]);
    attrs["score"] = parseInt(attrs["score"]);
    this.model.set(attrs);
    this.model.save({},{
      success: function(){
        that.collection.add(that.model, {merge: true});
      }
    })
  },

  render: function(){
    var content = this.template({
      gear: this.model,
      productid: this.productid});
    this.$el.html(content);
    return this;
  }
})
