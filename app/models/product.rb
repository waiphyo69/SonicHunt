class Product < ActiveRecord::Base
  validates: :image_url, :name, :category, :info, :avg_score, presence: true
  
end
