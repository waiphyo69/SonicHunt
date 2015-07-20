json.array! @gears.each do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :popularity
  json.image_url asset_path(gear.image.url(:original))
  json.upvote @upvoted_gear_hash[gear.id]
end
