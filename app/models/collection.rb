class Collection < ActiveRecord::Base

  validates :owner_id, :image_url, :title, presence: true

  has_many :gear_ids, foreign_key: :collection_id, class_name: "Geartocol"
  has_many :gears, through: :gear_ids, source: :gear

  has_many :product_ids, foreign_key: :collection_id, class_name: "Producttocol"
  has_many :products, through: :product_ids, source: :product

  belongs_to :user, foreign_key: :owner_id, class_name: "Users"

end
