class CreateProducttocols < ActiveRecord::Migration
  def change
    create_table :producttocols do |t|
      t.integer :product_id, null: false
      t.integer :collection_id, null: false

      t.timestamps null: false
    end
    add_index :producttocols, :product_id
    add_index :producttocols, :collection_id
    add_index :producttocols, [ :product_id, :collection_id], unique: true 
  end
end
