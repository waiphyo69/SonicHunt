class Review < ActiveRecord::Base
  validates :owner_id, :product_id, :description, :score, :helpfulness, presence: true
  belongs_to :owner, foreign_key: :owner_id, class_name: "User"
  belongs_to :product, foreign_key: :product_id, class_name: "Product"
end
