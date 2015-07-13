class CreateReviewtousers < ActiveRecord::Migration
  def change
    create_table :reviewtousers do |t|
      t.integer :review_id, null: false
      t.integer :upvoter_id, null: false

      t.timestamps null: false
    end
    add_index :reviewtousers, :review_id
    add_index :reviewtousers, :upvoter_id
    add_index :reviewtousers, [:review_id, :upvoter_id], unique: true
  end
end
