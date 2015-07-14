Sonichunt.Views.ReviewShow = Backbone.CompositeView.extend({

  template: JST["reviews/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
  },

  render: function(){
    var content = this.template({review: this.model, product: this.model.product});
    this.$el.html(content);
    return this;
  }

})
