class Gear < ActiveRecord::Base

    validates :owner_id, :title, :impression, :image_url, :popularity, presence: true

    has_many :collection_ids,
    foreign_key: :gear_id,
    class_name: "Geartocol",
    inverse_of: :gear

    has_many :collections,
    through: :collection_ids,
    source: :collection

    has_many :product_ids,
    foreign_key: :gear_id,
    class_name: "Geartopro",
    inverse_of: :gear

    has_many :products,
    through: :product_ids,
    source: :product

    has_many :subscribeds,
    foreign_key: :gear_id,
    class_name: "Geartouser",
    inverse_of: :gear

    has_many :subscribers,
    through: :subscriber_ids,
    source: :subscriber

    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User",
    inverse_of: :gears

    has_many :comments, as: :parent
end
