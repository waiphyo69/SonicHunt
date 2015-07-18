json.partial! "api/users/user", user: @user
json.gears @user.gears do |gear|
  json.extract! gear, :id, :owner_id, :title, :impression, :image_url, :popularity
end
json.reviews @user.reviews do |review|
  json.extract! review, :id, :owner_id, :product_id, :description, :score, :helpfulness, :title
end
json.collections @user.collections do |collection|
  json.extract! collection, :id, :owner_id, :title, :image_url
end
json.followers @user.followers do |follower|
  json.extract! follower, :id, :username, :email
end
json.followees @user.followees do |followee|
  json.extract! followee, :id, :username, :email
end
