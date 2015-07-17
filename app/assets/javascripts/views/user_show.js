
Sonichunt.Views.UserShow = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(this.model, "sync change", this.render);
  },

  template: JST['users/show'],

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  }

});
