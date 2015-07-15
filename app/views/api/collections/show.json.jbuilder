json.extract! @collection, :id, :owner_id, :title, :image_url
json.products @collection.products do |product|
  json.extract! product, :id, :image_url, :name, :category, :info, :avg_score
end
json.gears @collection.gears do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :image_url, :popularity
end
