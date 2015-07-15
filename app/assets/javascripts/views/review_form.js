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
    this.model.set(attrs);
    this.model.save({},{
      success: function(){
        that.collection.add(that.model, {merge: true});
        window.history.back();
      }
    })
  },

  render: function(){
    var content = this.template({review: this.model});
    this.$el.html(content);
    return this;
  }
})
