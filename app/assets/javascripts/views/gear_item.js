Sonichunt.Views.GearItem = Backbone.CompositeView.extend({

	tagName: "li",

	className: "gear-item group",

	template: JST['gears/item'],

	initialize: function(){
		var that = this;
		this.listenTo(this.model,"sync change",this.render);
		this.listenTo( this.model.upvote(), "sync change reset remove", this.render );
		this.listenTo( this.model.upvoters(), "sync add remove", this.render );
		this.addEditForm();

		$(document).click(function(e) {

				var target = e.target;

				if ( $(".add-to-collection-gear-"+ that.model.id).css("display") === "block" &&
				!$(target).parents().is(".add-to-collection-gear-"+ that.model.id) &&
				$(target).attr("class") != "add-gear"){

					$(".add-to-collection-gear-"+ that.model.id).hide();
					$("button.add-gear").css("display","inline");

				}
		});


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
		"click 	a.collection-add": "addGearToCollection",
		"click .submit-new-col": "submit",
		"click .upvote-button": "toggleUpvote"
	},


	createUpvote: function () {
		var that = this;
		this.model.upvote().set({
			subscriber_id: Sonichunt.currentUser.id,
			gear_id: parseInt(this.model.escape('id'))
		});
		this.model.upvote().save();
		this.model.upvoters().add(Sonichunt.currentUser);
	},

	destroyUpvote: function () {
		var that = this;
		this.model.upvote().destroy({
			success: function(model){
				that.model.upvoters().remove(Sonichunt.currentUser);
				model.unset("id");
			}
		});
	},

	toggleUpvote: function (event) {
		event.preventDefault();
		if (this.model.upvote().isNew()) {
			this.createUpvote();
		} else {
			this.destroyUpvote();
		}
	},

	submit: function(){

		event.preventDefault();
		var that = this;
		var attrs = $(".add-to-collection-gear-"+ this.model.id+" .new-collection").serializeJSON();
		attrs["owner_id"] = Sonichunt.currentUser.id;
		var collection = new Sonichunt.Models.Collection(attrs);

		collection.save({},{

			success: function(){

				var collection_id = collection.id;
				var gear_id = that.model.id;
				var geartocol = new Sonichunt.Models.GearToCol({gear_id: gear_id , collection_id: collection_id })
				geartocol.save({},{

					success: function(){

						Sonichunt.collections.add(collection, {merge: true})
						alert("Successfully saved to new collection!");
						$(".add-to-collection-gear-"+ that.model.id).hide();
						$(".add-gear").show();
						Backbone.history.navigate("",{trigger: true});
					}
				})
			}
		})
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
		event.preventDefault();
		var that = this;
		var collection_id = $(event.target).data("id");
		var gear_id = this.model.id;
		var geartocol = new Sonichunt.Models.GearToCol({gear_id: gear_id , collection_id: collection_id })

		geartocol.save({}, {

			success: function(){
			alert("Successfully saved to collection!")
			$(".add-to-collection-gear-"+ that.model.id).hide();
			$(".add-gear").css("display", "inline");
			Backbone.history.navigate("", {trigger: true})
		},

			error: function(){
			alert("Already in the collection!")
			$(".add-to-collection-gear-"+ that.model.id).hide();
			$(".add-gear").css("display", "inline");
			Backbone.history.navigate("", {trigger: true})
			}
		})
	},

	displayGearForm: function(){

		$(".edit-gear-"+ this.model.id).show();
		$(".edit-gear-button").hide()

	},

	displayCollectionForm: function(){

  	$(".add-to-collection-gear-"+ this.model.id).show();
		$(".collectionpopup").show();
		$(".add-gear").hide()

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
		var numUpvoters = this.model.upvoters().length;
		var content = this.template({gear: this.model, numUpvoters: numUpvoters});
		this.$el.html(content);
		this.$el.append("<button class='add-gear'>+</button>");
		this.attachSubviews();
		return this;

	}
})
