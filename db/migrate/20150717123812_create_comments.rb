class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content, null: false
      t.integer :parent_id, null: false

      t.timestamps null: false
    end
    add_index :comments, :parent_id
  end
end
