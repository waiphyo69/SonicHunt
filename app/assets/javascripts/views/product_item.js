Sonichunt.Views.ProductItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST["products/item"],

	initialize: function(){
		this.listenTo(this.model,"sync",this.render);
	},

	addStuffToCollection: function(){
		var collection_id = $("collectionclassname").data("id");
		var stuff_id = $("stuffclassname").data("id");
			var geartocol = new Sonichunt.Models.GearToCol({gear_id: stuff_id , collection_id: collection_id })
			geartocol.save()
	},

	render: function(){
		var content = this.template({product: this.model});
		this.$el.html(content);
		return this;
	}
})
