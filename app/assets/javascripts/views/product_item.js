Sonichunt.Views.ProductItem = Backbone.CompositeView.extend({

	tagName: "li",

	template: JST["products/item"],

	initialize: function(){

		var that = this;
		this.listenTo(this.model,"sync",this.render);

		$(document).click(function(e) {
		    var target = e.target;
		    if ( $(".add-to-collection-product-"+ that.model.id).css("display") === "block" &&
				!$(target).parents().is(".add-to-collection-product-"+ that.model.id) &&
				$(target).attr("class") != "add-product"){
					$(".add-to-collection-product-"+ that.model.id).hide();
					$(".add-product").css("display","inline");
		    }
		});

		Sonichunt.collections.fetch({
			success: function(){
				that.addCollectionNew();
			}
		})
	},

	events: {

		"click 	a.collection-add": "addProductToCollection",
		"click .add-product": "displayCollectionForm",
		"click .submit-new-col": "submit"

	},

	submit: function(){

		event.preventDefault();
		var that = this;
  	var attrs = $(".add-to-collection-product-"+ this.model.id+" .new-collection").serializeJSON();
		attrs["owner_id"] = Sonichunt.currentUser.id;
		var collection = new Sonichunt.Models.Collection(attrs);

		collection.save({}, {
			success: function(){
				var collection_id = collection.id;
				var product_id = that.model.id;
				var producttocol = new Sonichunt.Models.ProductToCol({product_id: product_id , collection_id: collection_id })
        producttocol.save({}, {
					success: function(){
						alert("Successfully saved to new collection!");
						$(".add-to-collection-product-"+ that.model.id).hide();
						$(".add-product").show();
						Backbone.history.navigate("", {trigger: true})
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

		this.addSubview(".add-to-collection-product-"+ this.model.id, collectionNewView);
	},

	addProductToCollection: function(){
		event.preventDefault();
		var that = this;
		var collection_id = $(event.target).data("id");
		var product_id = parseInt(this.model.escape("id"));
		var producttocol = new Sonichunt.Models.ProductToCol({product_id: product_id , collection_id: collection_id })

		producttocol.save({},{success: function(){
			alert("Successfully added to collection!");
			$(".add-to-collection-product-"+ that.model.id).hide();
			$(".add-product").show();
			Backbone.history.navigate(""+collection_id, {trigger: true})
		},
		error: function(){
      alert("Already in the collection");
			$(".add-to-collection-product-"+ that.model.id).hide();
			$(".add-product").show();
			Backbone.history.navigate("", {trigger: true})
			}
		})
	},

	displayCollectionForm: function(){
		$(".add-to-collection-product-"+ this.model.id).show();
		$("#collectionpopup").show();
		$(".add-product").hide();
	},

	render: function(){
		var content = this.template({product: this.model});
		this.$el.html(content);
		return this;
	}
})
