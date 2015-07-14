class Product < ActiveRecord::Base
  validates :image_url, :name, :category, :info, :avg_score, presence: true

  has_many :collection_ids, foreign_key: :product_id, class_name: "Producttocol"
  has_many :collections, through: :collection_ids, source: :collection

  has_many :gear_ids, foreign_key: :product_id, class_name: "Geartopro"
  has_many :gears, through: :gear_ids, source: :gear

  has_many :reviews, foreign_key: :product_id, class_name: "Review"
end
