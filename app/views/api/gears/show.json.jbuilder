json.extract! @gear, :id, :owner_id, :title, :impression, :popularity
json.image_url asset_path(@gear.image.url(:original))
json.products @gear.products do |product|
  json.extract! product, :id, :image_url, :name, :category, :info, :avg_score
end
json.comments @gear.comments do |comment|
  json.extract! comment, :id, :author_id, :content, :parent_id
  json.author_name comment.author.username
end
json.upvoters @gear.subscribers do |upvoter|
  json.extract! upvoter, :id, :username, :email
end
json.owner_name @gear.owner.username
json.owner_image_url asset_path(@gear.owner.image.url(:original))
json.upvote @upvoted_gear_hash[@gear.id]
