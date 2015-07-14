Sonichunt.Collections.Collection = Backbone.Collection.extend({
  url: "api/collections",

  model: Sonichunt.Models.Collection,

  getorFetch: function(id){
    var collections = this;
    var collection = this.get(id);
    if (collection){
      collection.fetch();
    } else {
      var collection = new Sonichunt.Models.Collection({id: id});
      collection.fetch({
        success: function(){
          collections.add(collection)
        }
      })
    }
    return collection;
  }
})
Sonichunt.collections = new Sonichunt.Collections.Collection();
