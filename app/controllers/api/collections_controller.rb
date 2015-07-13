module Api
  class ProductsController < ApiController
    def index
      @collections = Collection.all
      render json: @collections
    end
  end
end
