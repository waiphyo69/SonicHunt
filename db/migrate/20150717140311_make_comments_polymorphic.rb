class MakeCommentsPolymorphic < ActiveRecord::Migration
  def change
    add_column :comments, :parent_type, :string
  end
end
