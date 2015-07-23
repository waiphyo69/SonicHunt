json.extract! @review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
json.product_name @review.product.name
json.comments @review.comments do |comment|
  json.extract! comment, :id, :author_id, :content, :parent_id
  json.author_name comment.author.username
end
json.upvoters @review.upvoters do |upvoter|
  json.extract! upvoter, :id, :username, :email
end

json.owner_name @review.owner.username
json.upvote @upvoted_review_hash[@review.id]
json.owner_image_url asset_path(@review.owner.image.url(:original))
