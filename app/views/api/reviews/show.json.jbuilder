json.extract! @review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
json.comments @review.comments do |comment|
  json.extract! comment, :id, :author_id, :content, :parent_id
end

json.owner_name @review.owner.username
