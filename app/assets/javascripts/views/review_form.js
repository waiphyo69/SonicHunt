Sonichunt.Views.ReviewForm = Backbone.CompositeView.extend({

  template: JST["reviews/form"],

  className: "review-form",

  tagName: "form",

  initialize: function(options){
    this.listenTo(this.model, "sync", this.render)
    this.productid = options.productid
  },

  events: {
  "click .submit": "submit",
  "click .cancel": "cancel"
  },

  cancel: function(){
    $(".new-review").css("display","none");
  },

  submit: function(){
    $(".new-review").css("display","none");
    var that = this;
    var attrs = this.$el.serializeJSON();
    attrs["owner_id"] = parseInt(attrs["owner_id"]);
    attrs["product_id"] = parseInt(attrs["product_id"]);
    attrs["score"] = parseInt(attrs["score"]);
    this.model.set(attrs);
    this.model.save({},{
      success: function(){
        that.collection.add(that.model, {merge: true});
        var product = Sonichunt.products.getorFetch(that.productid);
        product.set({"avg_score": parseInt(that.model.escape('score')) / product.reviews().length})
        product.save();
      }
    })
  },

  render: function(){
    var content = this.template({
      review: this.model,
      productid: this.productid});
    this.$el.html(content);
    return this;
  }
})
