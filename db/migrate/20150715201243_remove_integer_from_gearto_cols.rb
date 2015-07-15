class RemoveIntegerFromGeartoCols < ActiveRecord::Migration
  def change
    remove_column :geartocols, :integer
  end
end
