Sonichunt.Views.ProductItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST["products/item"],

	initialize: function(){
		var that = this;
		this.listenTo(this.model,"sync",this.render);
		Sonichunt.collections.fetch({
			success: function(){
				that.addCollectionNew();
			}
		})
	},

	events: {
		"click 	a.collection-add": "addProductToCollection",
		"click .add-product": "displayCollectionForm",
	},

	addCollectionNew: function(){
		var collection = new Sonichunt.Models.Collection();
		var collectionNewView = new Sonichunt.Views.CollectionNew({
			model: collection,
			collection: Sonichunt.collections
		})
		this.addSubview(".add-to-collection", collectionNewView);
	},

	addProductToCollection: function(){
		var that = this;
		var collection_id = $(event.target).data("id");
		var product_id = parseInt(this.model.escape("id"));
		var producttocol = new Sonichunt.Models.ProductToCol({product_id: product_id , collection_id: collection_id })
		producttocol.save({success: function(){
			that.render;
			$(".add-to-collection-product-"+ this.model.id).css("display","none");
			$(".add-product").css("display", "inline");
			}
		})
	},

	displayCollectionForm: function(){
		$(".add-to-collection-product-"+ this.model.id).css("display","block");
		$(".add-product").css("display", "none");
	}


	render: function(){
		var content = this.template({product: this.model});
		this.$el.html(content);
		return this;
	}
})
