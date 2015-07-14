Sonichunt.Views.GearShow = Backbone.CompositeView.extend({

  template: JST["gears/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.products(), "add", this.addReview);
    this.model.products().each(this.addProduct.bind(this));
  },

  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview(".products", productItemView);
  },

  render: function(){
    var content = this.template({gear: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
