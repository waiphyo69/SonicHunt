json.extract! @comment, :id, :author_id, :content, :parent_id, :parent_type
json.author_image_url asset_path(@comment.author.image.url(:original))
json.author_name @comment.author.username
