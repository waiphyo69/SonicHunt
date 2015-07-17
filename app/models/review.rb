class Review < ActiveRecord::Base
  validates :owner_id, :product_id, :description, :score, :helpfulness, presence: true
  validates :score, :numericality => { :greater_than => 0, :less_than_or_equal_to => 10 }

  belongs_to :owner,
  foreign_key: :owner_id,
  class_name: "User",
  inverse_of: :reviews

  belongs_to :product,
  foreign_key: :product_id,
  class_name: "Product",
  inverse_of: :reviews

  has_many :upvoter_ids,
  foreign_key: :review_id,
  class_name: "Reviewtouser",
  inverse_of: :review

  has_many :upvoters,
  through: :upvoter_ids,
  source: :upvoter

  has_many :comments, as: :parent
end
