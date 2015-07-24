class Gear < ActiveRecord::Base

    validates :owner_id, :title, :impression, :popularity, presence: true

    has_attached_file :image,
    default_url: "missing.png"

    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

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
    through: :subscribeds,
    source: :subscriber

    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User",
    inverse_of: :gears

    has_many :comments, as: :parent

    def product_names_string
      str = ""
      self.products.each{|product| str+= product.name + "$$"}
      return str
    end

end
