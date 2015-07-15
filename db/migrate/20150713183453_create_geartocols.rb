class CreateGeartocols < ActiveRecord::Migration
  def change
    create_table :geartocols do |t|
      t.integer :gear_id
      t.integer :collection_id
      t.string :integer

      t.timestamps null: false
    end
    add_index :geartocols, :gear_id
    add_index :geartocols, :collection_id
    add_index :geartocols, [:gear_id, :collection_id], unique: true
  end
end
