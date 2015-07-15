Sonichunt.Views.ReviewForm = Backbone.CompositeView.extend({

  template: JST["reviews/form"],

  tagName: "form",

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
  "click button": "submit"
  },

  submit: function(){
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    attrs["owner_id"] = parseInt(attrs["owner_id"]);
    attrs["product_id"] = parseInt(attrs["product_id"]);
    attrs["score"] = parseInt(attrs["score"]);
    this.model.set(attrs);
    this.model.save({},{
      success: function(){
        that.collection.add(that.model, {merge: true});
        window.history.back();
      }
    })
  },

  render: function(){
    var currUrl = document.URL;
// split string to obtain substring
    var index; var str;
    if((index = currUrl.indexOf("?")) > 0) str = currUrl.substring(index + 1);
    var array = str.split("=");
    var productid = parseInt(array[1]);
    var content = this.template({
      review: this.model,
      productid: productid});
    this.$el.html(content);
    return this;
  }
})
