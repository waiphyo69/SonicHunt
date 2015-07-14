class Follow < ActiveRecord::Base
  belongs_to :follower,
  foreign_key: :follower_id,
  class_name: "User",
  inverse_of: :followee_follows

  belongs_to :followee,
  foreign_key: :followee_id,
  class_name: "User",
  inverse_of: :follower_follows
end
