Sonichunt.Views.ProductItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST["products/item"],

	initialize: function(){
		this.listenTo(this.model,"sync",this.render);
	},

	render: function(){
		var content = this.template({product: this.model});
		this.$el.html(content);
		return this;
	}
})