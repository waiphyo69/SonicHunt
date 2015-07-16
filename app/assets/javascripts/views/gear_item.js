Sonichunt.Views.GearItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST['gears/item'],

	initialize: function(){
		this.listenTo(this.model,"sync change",this.render);
		this.addEditForm();
	},

	addStuffToCollection: function(){
		var collection_id = $("collectionclassname").data("id");
		var stuff_id = $("stuffclassname").data("id");
			var geartocol = new Sonichunt.Models.GearToCol({gear_id: stuff_id , collection_id: collection_id })
			geartocol.save()
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
		event.preventDefault();
		this.model.destroy();
		alert("Gear successfully deleted!");
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
