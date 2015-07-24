class Collection < ActiveRecord::Base

  validates :owner_id, :image_url, :title, presence: true

  has_many :gear_ids,
  foreign_key: :collection_id,
  class_name: "Geartocol",
  inverse_of: :collection

  has_many :gears,
  through: :gear_ids,
  source: :gear

  has_many :product_ids,
  foreign_key: :collection_id,
  class_name: "Producttocol",
  inverse_of: :collection

  has_many :products,
  through: :product_ids,
  source: :product

  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: "User",
  inverse_of: :collections

  def product_names_string
    str = ""
    self.products.each{|product| str+= product.name + "$$"}
    self.gears.each{|gear| str+= gear.product_names_string}
    return str
  end

  def gear_names_string
    str = ""
    self.gears.each{|gear| str+= gear.title + "$$"}
    return str
  end

end
