class Product < ActiveRecord::Base
  validates :image_url, :name, :category, :info, :avg_score, presence: true

  has_many :collection_ids,
  foreign_key: :product_id,
  class_name: "Producttocol",
  inverse_of: :product

  has_many :collections,
  through: :collection_ids,
  source: :collection

  has_many :gear_ids,
  foreign_key: :product_id,
  class_name: "Geartopro",
  inverse_of: :product

  has_many :gears,
  through: :gear_ids,
  source: :gear

  has_many :reviews,
  foreign_key: :product_id,
  class_name: "Review",
  inverse_of: :product

end
