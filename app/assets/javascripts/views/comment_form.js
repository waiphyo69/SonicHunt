Sonichunt.Views.CommentForm = Backbone.CompositeView.extend({

  template: JST["comments/form"],

  className: "comment-form",

  tagName: "form",


  initialize: function(options){
    this.listenTo(this.model, "sync", this.render);
    this.parentID = options.parentID;
    this.parentType = options.parentType;
  },

  events: {
  "click .submit": "submit",
  "click .cancel": "cancel"
  },

  cancel: function(){
    event.preventDefault();
    if ( this.model.isNew() ) {
      $(".new-comment").hide();
    } else {
      $(".edit-comment-"+this.model.escape('id')).hide();
    }
  },

  submit: function(){
    event.preventDefault();
    var that = this;
    var attrs = this.$el.serializeJSON();
    if ( this.model.isNew() ) {
      $(".new-comment").hide();
      attrs["author_id"] = Sonichunt.currentUser.id;
      attrs["parent_id"] = that.parentID;
      attrs["parent_type"] = that.parentType;
      this.model.set(attrs);
      this.model.save({},{
          success: function(){
            that.model.fetch({
              success: function(){
                that.collection.add(that.model);
              }
            })
          }
      },
        {error: function(){
          alert("Can't be blank. Please try again!");
          }
        })
    } else {
        $(".edit-comment-"+this.model.escape('id')).hide();
          this.model.set(attrs);
          var that = that;
          this.model.save({}, {
            success: function(){

            },
            error: function(){
              alert("Can't be blank. Please try again!");
              }
            })

      }
  },

  render: function(){
    var content = this.template({
      comment: this.model
      });
    this.$el.html(content);
    return this;
  }
})
