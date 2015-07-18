json.(user, :id, :username, :email)
json.follow user.followee_hash[user.id]
