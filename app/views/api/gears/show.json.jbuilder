json.extract! @gear, :id, :owner_id, :title, :impression, :image_url, :popularity
json.products @gear.products do |product|
  json.extract! product, :id, :image_url, :name, :category, :info, :avg_score
end
json.owner_name @gear.owner.username
