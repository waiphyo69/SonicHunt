class Geartopro < ActiveRecord::Base
  belongs_to :gear,
  foreign_key: :gear_id,
  class_name: "Gear",
  inverse_of: :product_ids

  belongs_to :product,
  foreign_key: :product_id,
  class_name: "Product",
  inverse_of: :gear_ids
end
