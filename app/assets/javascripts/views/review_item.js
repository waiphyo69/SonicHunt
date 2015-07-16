Sonichunt.Views.ReviewItem = Backbone.CompositeView.extend({

  tagName: "li",

  template: JST["reviews/item"],

  initialize: function(){
    this.listenTo( this.model, "sync", this.render);
    this.addEditForm();
  },

  events: {
    "click button.edit-review-button": "displayEditForm",
    "click .review-delete": "destroyReview"
  },

  destroyReview: function(){
    this.model.destroy();
  },

  displayEditForm: function(){
    $(".edit-review-"+ this.model.escape('id')).css("display","block");
  },


  addEditForm: function(){
    var review = new Sonichunt.Collections.Reviews().getorFetch(this.model.id);
    var editView = new Sonichunt.Views.ReviewForm({
      model: review
    });
    this.addSubview(".edit-review-"+this.model.id, editView);
  },

  render: function(){
    var content = this.template({review: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
