class AddColumnAuthorIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :author_id, :integer, null: false
  end
end
