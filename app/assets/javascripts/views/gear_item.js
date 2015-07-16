Sonichunt.Views.GearItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST['gears/item'],

	initialize: function(){
		this.listenTo(this.model,"sync",this.render);
		this.addEditForm();
	},

	events: {
		"click .edit-gear-button": "displayGearForm",
		"click .gear-delete": "destroyGear"
	},

	displayGearForm: function(){
		$(".edit-gear-"+ this.model.escape('id')).css("display","inline");
		$(".edit-gear-button").css("display", "none")
	},

	destroyGear: function(){
		this.model.destroy();
	},

	addEditForm: function(){
		var gear = Sonichunt.gears.getorFetch(this.model.id);
		var editView = new Sonichunt.Views.GearForm({
			model: gear
		});
		this.addSubview(".edit-gear-"+this.model.id, editView);
	},

	render: function(){
		var content = this.template({gear: this.model});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})
