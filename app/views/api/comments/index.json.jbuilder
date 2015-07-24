json.array! @comments.each do |comment|
  json.extract! comment, :id, :content, :parent_id, :created_at, :updated_at, :author_id, :parent_type
  json.author_name comment.author.username
end
