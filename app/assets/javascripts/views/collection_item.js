Sonichunt.Views.CollectionItem = Backbone.CompositeView.extend({

	tagName: "li",

	className: "collection-item",
	
	template: JST["collections/item"],

	initialize: function(){
		this.listenTo(this.model,"sync",this.render);
	},


	render: function(){
		var content = this.template({collection: this.model});
		this.$el.html(content);
		return this;
	}
})
