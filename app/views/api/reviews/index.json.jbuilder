json.array! @reviews.each do |review|
  json.extract! review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
  json.upvote @upvoted_review_hash[review.id]
  json.product_name review.product.name
  json.owner_image_url asset_path(review.owner.image.url(:original))
end
