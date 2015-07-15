module Api
  class CollectionsController < ApiController
    def index
      @collections = Collection.all
      render json: @collections
    end

    def show
      @collection = Collection.find(params[:id])
    end
  end
end
