json.(user, :id, :username, :email)
json.image_url asset_path(user.image.url(:original))
json.follow user.followee_hash[user.id]
