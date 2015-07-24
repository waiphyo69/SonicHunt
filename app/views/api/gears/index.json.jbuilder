json.array! @gears.each do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :popularity
  json.owner_name gear.owner.username
  json.owner_image_url asset_path(gear.owner.image.url(:original))
  json.image_url asset_path(gear.image.url(:original))
  json.upvote @upvoted_gear_hash[gear.id]
  json.product_names gear.product_names_string
end
