class Producttocol < ActiveRecord::Base
  belongs_to :product, foreign_key: :product_id, class_name: "Product"
  belongs_to :collection, foreign_key: :collection_id, class_name: "Collection"
end
