Sonichunt.Views.ReviewItem = Backbone.CompositeView.extend({

  template: JST["reviews/item"],

  initialize: function(){
    this.listenTo( this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({review: this.model});
    this.$el.html(content);
    return this;
  }
})
