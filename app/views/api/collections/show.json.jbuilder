json.extract! @collection, :id, :owner_id, :title, :image_url
json.owner_name @collection.owner.username
json.product_names @collection.product_names_string
json.gear_names @collection.gear_names_string
json.products @collection.products do |product|
  json.extract! product, :id, :name, :image_url, :category, :info, :avg_score
end
json.gears @collection.gears do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :popularity
  json.image_url asset_path(gear.image.url(:original))
end
json.owner_image_url asset_path(@collection.owner.image.url(:original))
