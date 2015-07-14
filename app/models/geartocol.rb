class Geartocol < ActiveRecord::Base
  belongs_to :gear,
  foreign_key: :gear_id,
  class_name: "Gear",
  inverse_of: :collection_ids

  belongs_to :collection,
  foreign_key: :collection_id,
  class_name: "Collection",
  inverse_of: :gear_ids
end
