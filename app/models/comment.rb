class Comment < ActiveRecord::Base
  validates :content, :parent_id, presence: true

  belongs_to :products,
  foreign_key: :parent_id,
  inverse_of: :comments

  belongs_to :reviews,
  foreign_key: :parent_id,
  inverse_of: :comments

  belongs_to :gears,
  foreign_key: :parent_id,
  inverse_of: :comments

  belongs_to :author,
  class_name: "Users",
  foreign_key: :author_id,
  inverse_of: :comments
  
end
