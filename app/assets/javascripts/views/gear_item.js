Sonichunt.Views.GearItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST['gears/item'],

	initialize: function(){
		var that = this;
		this.listenTo(this.model,"sync change",this.render);
		this.addEditForm();
		Sonichunt.collections.fetch({
			success: function(){
				that.addCollectionNew();
			}
		})
	},

	events: {
		"click .add-gear": "displayCollectionForm",
		"click .edit-gear-button": "displayGearForm",
		"click .gear-delete": "destroyGear",
		"click 	a.collection-add": "addGearToCollection"
	},

	addCollectionNew: function(){
  	var collection = new Sonichunt.Models.Collection();
		var collectionNewView = new Sonichunt.Views.CollectionNew({
			model: collection,
			collection: Sonichunt.collections
		})
		this.addSubview(".add-to-collection-gear-"+ this.model.id, collectionNewView);
	},

	addGearToCollection: function(){
		var that = this;
		var collection_id = $(event.target).data("id");
		var gear_id = parseInt(this.model.escape("id"));
		var geartocol = new Sonichunt.Models.GearToCol({gear_id: gear_id , collection_id: collection_id })
		geartocol.save({success: function(){
			$(".add-to-collection-gear-"+ this.model.id).css("display","none");
			$(".add-gear").css("display", "inline");
			Backbone.history.navigate("", {trigger: true})
		}, error: function(){
			alert("Already in the collection!")
			$(".add-to-collection-gear-"+ this.model.id).css("display","none");
			$(".add-gear").css("display", "inline");
			Backbone.history.navigate("", {trigger: true})
		}
		})
	},

	displayGearForm: function(){
		$(".add-to-collection-gear-"+ this.model.id).css("display","block");
		$(".add-gear").css("display", "none")
	},

	displayCollectionForm: function(){
  	$(".add-to-collection-gear-"+ this.model.id).css("display","inline");
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
