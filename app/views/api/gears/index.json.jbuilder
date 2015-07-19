json.array! @gears.each do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :image_url, :popularity
  json.upvote @upvoted_gear_hash[gear.id]
end
