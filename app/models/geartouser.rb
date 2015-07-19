class Geartouser < ActiveRecord::Base
  belongs_to :gear,
  foreign_key: :gear_id,
  class_name: "Gear",
  inverse_of: :subscribeds

  belongs_to :subscriber,
  foreign_key: :subscriber_id,
  class_name: "User",
  inverse_of: :subscribeds
end
