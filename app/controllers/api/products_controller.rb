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

    def update
      @product = Product.find(params[:id])
      if @product.update(product_params)
        render json: @product
      else
        render json: @product.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def product_params
      params.require(:product).permit(:id,:avg_score)
    end
  end
end
