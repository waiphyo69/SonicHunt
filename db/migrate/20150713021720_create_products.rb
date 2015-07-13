class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :image_url, null: false
      t.string :name, null: false
      t.string :category, null: false
      t.text :info, null: false
      t.integer :avg_score, default: 0

      t.timestamps null: false
    end
    add_index :products, :name, unique: true
  end
end
