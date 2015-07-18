Sonichunt.Views.CollectionShow = Backbone.CompositeView.extend({
  template: JST["collections/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.products(), "add", this.addProduct);
    this.listenTo(this.model.gears(), "add", this.addGear);
    this.model.products().each(this.addProduct.bind(this));
    this.model.gears().each(this.addGear.bind(this));
  },

  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    productItemView.$el.append( "<button data-id="+product.escape('id') + ">Remove</button>" );
    this.addSubview(".products", productItemView);
    
    if ( Sonichunt.currentUser.id === parseInt( this.model.escape('owner_id') ) ) {
      productItemView.$el.append( "<button class='remove' data-id="+product.escape('id') + ">Remove</button>" );
    }
  },

  addGear: function(gear){
    var gearItemView = new Sonichunt.Views.GearItem({model: gear});
    this.addSubview(".gears", gearItemView);
  },

  render: function(){
    var content = this.template({collection: this.model});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
