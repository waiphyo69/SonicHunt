class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :owner_id, null: false
      t.integer :product_id, null: false
      t.text :description, null: false
      t.integer :score, null: false
      t.integer :helpfulness, default: 0

      t.timestamps null: false
    end
    add_index :reviews, :owner_id
    add_index :reviews, :product_id
    add_index :reviews, [:owner_id, :product_id], unique: true
  end
end
