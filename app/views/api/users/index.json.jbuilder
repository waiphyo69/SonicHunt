json.array! @users do |user|
  json.partial! "api/users/user", user: user, followee_hash: user.followee_hash
end
