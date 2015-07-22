class Addimageuploadtousers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.has_attached_file :image
    end
  end
end
