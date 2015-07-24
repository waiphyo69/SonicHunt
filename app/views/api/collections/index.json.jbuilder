json.array! @collections.each do |collection|
  json.extract! collection, :id, :owner_id, :title, :image_url
  json.owner_name collection.owner.username
  json.product_names collection.product_names_string
  json.gear_names collection.gear_names_string
end
