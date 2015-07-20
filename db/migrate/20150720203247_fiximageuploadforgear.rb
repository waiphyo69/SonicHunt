class Fiximageuploadforgear < ActiveRecord::Migration
  def change
    remove_column :gears, :image_url
    change_table :gears do |t|
      t.has_attached_file :image
    end
  end
end
