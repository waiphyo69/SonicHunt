module Api
  class ProductsController < ApiController
    def index
      @products = Product.all
      render json: @products
    end
  end
end
