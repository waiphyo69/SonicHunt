Sonichunt.Views.GearItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST['gears/item'],

	initialize: function(){
		this.listenTo(this.model,"sync",this.render);
	},

	render: function(){
		var content = this.template({gear: this.model});
		this.$el.html(content);
		return this;
	}
})
