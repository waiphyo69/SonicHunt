class CreateGeartousers < ActiveRecord::Migration
  def change
    create_table :geartousers do |t|
      t.integer :gear_id, null: false
      t.integer :subscriber_id, null: false

      t.timestamps null: false
    end
    add_index :geartousers, :gear_id
    add_index :geartousers, :subscriber_id
    add_index :geartousers, [:gear_id, :subscriber_id], unique: true
  end
end
