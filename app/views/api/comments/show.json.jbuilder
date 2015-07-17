json.extract! @comment, :id, :author_id, :content, :parent_id
json.author_name @comment.author.username
