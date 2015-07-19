Sonichunt.Views.UserItem = Backbone.CompositeView.extend({

  template: JST["users/item"],

  tagName: "li",

  className: "user-item",

  initialize: function(){
    this.listenTo( this.model, "sync change", this.render );
    this.listenTo( this.model.follow(), "sync change reset remove", this.render );
  },

  events: {
    "click .follow-button": "toggleFollow"
  },

  createFollow: function () {
    var that = this;
    this.model.follow().set({
      follower_id: Sonichunt.currentUser.id,
      followee_id: parseInt(that.model.escape('id'))
    });
    this.model.follow().save({},{
      success: function(){
        that.collection.add(that.model,{ merge: true});
      }
    });
  },

  destroyFollow: function () {
    var that = this;
    this.model.follow().destroy({
      success: function(model){
        model.unset("id");
        that.collection.remove(model);
      }
    });
  },

  toggleFollow: function (event) {
    event.preventDefault();
    if (this.model.follow().isNew()) {
      this.createFollow();
    } else {
      this.destroyFollow();
    }
  },

  render: function(){
   var content = this.template({ user: this.model });
   this.$el.html(content);
   this.attachSubviews();
   return this;
  }

})
