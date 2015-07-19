json.array! @reviews.each do |review|
  json.extract! review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
  json.upvote @upvoted_review_hash[review.id]
end
