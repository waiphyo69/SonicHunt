class CreateGears < ActiveRecord::Migration
  def change
    create_table :gears do |t|
      t.integer :owner_id, null: false
      t.string :title, null: false
      t.text :impression, null: false
      t.string :image_url, null: false
      t.integer :popularity, default: 0

      t.timestamps null: false
    end
    add_index :gears, :owner_id
  end
end
