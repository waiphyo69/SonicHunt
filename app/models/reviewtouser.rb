class Reviewtouser < ActiveRecord::Base
  belongs_to :review, foreign_key: :review_id, class_name: "Review"
  belongs_to :upvoter, foreign_key: :upvoter_id, class_name: "User"
end
