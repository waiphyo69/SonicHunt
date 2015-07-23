Sonichunt.Views.CollectionShow = Backbone.CompositeView.extend({
  template: JST["collections/show"],


  className: "collection-show group",

  initialize: function(){
    var that = this;
    this.listenTo(this.model, "sync chane remove", this.render);
    this.listenTo(this.model.products(), "add", this.addProduct);
    this.listenTo(this.model.gears(), "add", this.addGear);
    this.listenTo(this.model.products(), "remove", this.render);
    this.listenTo(this.model.gears(), "remove", this.render);
    this.listenTo(this.model.products(), "remove", this.removeProduct);
    this.listenTo(this.model.gears(), "remove", this.removeGear);
    this.model.products().each(this.addProduct.bind(this));
    this.model.gears().each(this.addGear.bind(this));
  },

  removeProduct: function(product){
    this.removeModelSubview(".products", product)
  },

  removeGear: function(gear){
    debugger
    this.removeModelSubview(".gears", gear)
  },


  events: {
    "click .remove-pro-from-col": "deleteProFromCol",
    "click .remove-gear-from-col": "deleteGearFromCol",
    "click .collection-delete": "destroyCol"
  },


  destroyCol: function(){
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate("#/products", { trigger: true })
  },

  deleteProFromCol: function(event){
    var that = this;
    var product_id = parseInt($(event.target).data("id"));
    var that = this;
    var producttocols = new Sonichunt.Collections.ProductToCols();
    producttocols.fetch({
      success: function(){
        var producttocol = producttocols.where({
          product_id: product_id,
          collection_id: that.model.id
        })
        producttocol[0].destroy({
          success: function(){
            that.model.products().remove(that.model.products().get(product_id));
          }
        });
      }
    })
  },

  deleteGearFromCol: function(){
    var gear_id = parseInt($(event.target).data("id"));
    var that = this;
    var geartocols = new Sonichunt.Collections.GearToCols();
    geartocols.fetch({
      success: function(){
        var geartocol = geartocols.where({
          gear_id: gear_id,
          collection_id: that.model.id
        })
        geartocol[0].destroy({
          success: function(){
            that.model.gears().remove(that.model.gears().get(gear_id));
          }
        });
      }
    })
  },

  addProduct: function(product){
    var productItemView = new Sonichunt.Views.ProductItem({model: product});
    this.addSubview(".products", productItemView);
    if ( Sonichunt.currentUser.id === parseInt( this.model.escape('owner_id') ) ) {
      productItemView.$el.append( "<button class='remove-pro-from-col' data-id="+product.escape('id') + ">Remove from collection</button>" );
    }
  },

  addGear: function(gear){
    var that = this;
    gear.fetch({
      success: function(){
        var gearItemView = new Sonichunt.Views.GearItem({model: gear});
        that.addSubview(".gears", gearItemView);
        if ( Sonichunt.currentUser.id === parseInt( that.model.escape('owner_id') ) ) {
          gearItemView.$el.append( "<button class='remove-gear-from-col' data-id="+gear.escape('id') + ">Remove from collection</button>" );
        };
      }
    })
  },

  render: function(){
    var content = this.template({collection: this.model});
    this.$el.html(content);
    this.attachSubviews();
    this.$el.find(".add-gear").remove()
    return this;
  }
})
