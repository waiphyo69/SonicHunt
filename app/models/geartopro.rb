class Geartopro < ActiveRecord::Base
  belongs_to :gear, foreign_key: :gear_id, class_name: "Gear"
  belongs_to :product, foreign_key: :product_id, class_name: "Product"
end
