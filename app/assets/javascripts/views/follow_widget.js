Sonichunt.Views.FollowWidget = Backbone.CompositeView.extend({
  template: JST["users/follow_widget"],

  events: {
    "click": "toggleFollow"
  },

  initialize: function () {
    this.listenTo(this.model.follow(), "sync change", this.render);
  },

  toggleFollow: function (event) {
    event.preventDefault();
    this.model.toggleFollow();
  },

  render: function () {
    var renderedContent = this.template({
      follow: this.model.follow(),
      user: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});
