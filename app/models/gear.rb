class Gear < ActiveRecord::Base

    validates :owner_id, :title, :impression, :image_url, :popularity, presence: true

    has_many :collection_ids, foreign_key: :gear_id, class_name: "Geartocol"
    has_many :collections, through: :collection_ids, source: :collection
    belongs_to :user, foreign_key: :owner_id, class_name: "Users"
end