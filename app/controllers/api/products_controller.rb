module Api
  class ProductsController < ApiController
    def index
      @products = Product.all
      render json: @products
    end

    def show
      @product = Product.find(params[:id])
      render :show
    end

    private
    # def product_params
    #
    # end
  end
end
