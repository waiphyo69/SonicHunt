class AddTitleColumnToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :title, :string, null: false
  end
end
