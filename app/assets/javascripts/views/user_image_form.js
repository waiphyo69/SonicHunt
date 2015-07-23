Sonichunt.Views.UserImageForm = Backbone.CompositeView.extend({

  template: JST['users/image_edit'],

  tagName: "form",

  className: "user-image-upload",
  
  events: {
    "click .save": "submit",
    "change #input-user-image": "fileInputChange"
  },

  render: function(){
    var html = this.template();

    this.$el.html(html);
    return this;
  },

  submit: function(event){

    event.preventDefault();
    var file = this.$("#input-user-image")[0].files[0];

    var formData = new FormData();
    formData.append("user[image]", file);

    $("edit-image").hide();
    $(".edit-pic").show();

    var that = this;
    this.model.saveFormData(formData, {
      success: function(){
        Sonichunt.router.userShow(that.model.id);
      }
    });

  },

  fileInputChange: function(event){

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-user-image").attr("src", src);
  }

});
