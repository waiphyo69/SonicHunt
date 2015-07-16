Sonichunt.Views.ProductItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST["products/item"],

	initialize: function(){
		this.listenTo(this.model,"sync",this.render);
		this.addCollectionNew();
	},

	events: {
		"click 	a.collection-add": "addProductToCollection"
	},

	addCollectionNew: function(){
		var collection = new Sonichunt.Models.Collection();
		var collectionNewView = new Sonichunt.Views.CollectionNew({
			model: collection,
			collection: Sonichunt.collections
		})
		this.addSubview(".add-to-collection", collectionNewView);
	},

	addGearToCollection: function(){
		var that = this;
		var collection_id = $(event.target).data("id");
		var product_id = this.model.escape("id");
		var producttocol = new Sonichunt.Models.ProductToCol({product_id: product_id , collection_id: collection_id })
		geartocol.save(success: function(){
			that.render;
		})
	},


	render: function(){
		var content = this.template({product: this.model});
		this.$el.html(content);
		return this;
	}
})
