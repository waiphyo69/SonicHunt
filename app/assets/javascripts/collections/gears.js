Sonichunt.Collections.Gears = Backbone.Collection.extend({
  url: "/api/gears",

  model: Sonichunt.Models.Gear,

  comparator: function(gear) {
    return gear.get('popularity');
  },

  getorFetch: function(id){
    var gears = this;
    var gear = this.get(id);
    if (gear){
      gear.fetch();
    } else {
      var gear = new Sonichunt.Models.Gear({id: id});
      gear.fetch({
        success: function(){
          gears.add(gear)
        }
      })
    }
    return gear;
  }
})
Sonichunt.gears = new Sonichunt.Collections.Gears();
