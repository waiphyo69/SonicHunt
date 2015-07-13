class CreateGeartopros < ActiveRecord::Migration
  def change
    create_table :geartopros do |t|
      t.integer :gear_id, null: false
      t.integer :product_id, null: false

      t.timestamps null: false
    end
    add_index :geartopros, :gear_id
    add_index :geartopros, :product_id
    add_index :geartopros, [:gear_id, :product_id], unique: true 
  end
end
