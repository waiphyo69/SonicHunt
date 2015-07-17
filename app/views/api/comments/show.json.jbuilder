json.extract! @comment, :id, :author_id, :content, :parent_id, :parent_type
json.author_name @comment.author.username
