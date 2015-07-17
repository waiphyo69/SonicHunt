class Comment < ActiveRecord::Base
  validates :content, :parent_id, presence: true

  belongs_to :parent, polymorphic: true

  belongs_to :author,
  class_name: "User",
  foreign_key: :author_id,
  inverse_of: :comments

end
