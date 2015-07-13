class Collection < ActiveRecord::Base

  validates :owner_id, :image_url, :title, presence: true

  has_many :gear_ids, foreign_key: :collection_id, class_name: "Geartocol"
  has_many :gears, through: :gear_ids, source: :gear
  belongs_to :user, foreign_key: :owner_id, class_name: "Users"
  
end
