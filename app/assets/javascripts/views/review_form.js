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
    event.preventDefault();
    if ( this.model.isNew() ) {
      $(".new-review").css("display","none");
    } else {
      $(".edit-review-"+this.model.escape('id')).css("display","none");
    }
  },

  submit: function(){
    var that = this;
    var attrs = this.$el.serializeJSON();
    attrs["score"] = parseInt(attrs["score"]);
    if ( this.model.isNew() ) {
      $(".new-review").css("display","none");
      attrs["owner_id"] = parseInt(attrs["owner_id"]);
      attrs["product_id"] = parseInt(attrs["product_id"]);
      this.model.set(attrs);
      this.model.save({},{
        success: function(){
          that.collection.add(that.model, {merge: true});
          var product = Sonichunt.products.getorFetch(that.productid);
          product.set({"avg_score": ( parseInt(that.model.escape('score')) + parseInt(product.escape('avg_score')) ) / ( product.reviews().length ) })
          product.save();
          },
        error: function(){
          alert("Invalid Input. Please try again!");
          }
        })
    } else {
        $(".edit-review-"+this.model.escape('id')).css("display","none");
        var oldScore = parseInt(this.model.escape('score'));
        this.model.set(attrs);
        this.model.save({},{
          success: function(){
            var product = Sonichunt.products.getorFetch(that.model.escape('product_id'));
            if (product.reviews().length > 1) {
              debugger
              var oldAvgScore = ( ( parseInt( product.escape('avg_score') ) * product.reviews().length ) - oldScore )/ ( product.reviews().length - 1 );
            } else {
              var oldAvgScore = 0;
            }
            product.set({"avg_score": ( parseInt(that.model.escape('score')) + oldAvgScore ) / ( product.reviews().length )})
            product.save();
            },
          error: function(){
            alert("Invalid Input. Please try again!");
            }
          })
    }
  },

  render: function(){
    var content = this.template({
      review: this.model,
      productid: this.productid});
    this.$el.html(content);
    return this;
  }
})
