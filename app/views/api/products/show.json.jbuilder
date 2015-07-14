json.extract! @product, :id, :image_url, :name, :category, :info, :avg_score
json.reviews @product.reviews do |review|
  json.extract! review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
end
