json.extract! @collection, :id, :owner_id, :title, :image_url
json.products @collection.products do |product|
  json.extract! product, :id, :name, :image_url, :category, :info, :avg_score
end
json.gears @collection.gears do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :popularity
  json.image_url asset_path(gear.image.url(:original))
end
