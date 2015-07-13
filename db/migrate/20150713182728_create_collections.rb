class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.integer :owner_id, null: false
      t.string :image_url, default: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTZ5aDVyllZi1iiTJ0dr7fY2ig6xVGswpkTv7MEy8WTqwpkNHA"
      t.string :title, null: false

      t.timestamps null: false
    end
    add_index :collections, :title
    add_index :collections, :owner_id
  end
end
