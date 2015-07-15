json.extract! @review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
json.owner_name @review.owner.username
