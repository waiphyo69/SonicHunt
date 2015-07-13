class Geartouser < ActiveRecord::Base
  belongs_to :gear, foreign_key: :gear_id, class_name: "Gear"
  belongs_to :subscriber, foreign_key: :subscriber_id, class_name: "User"
end
