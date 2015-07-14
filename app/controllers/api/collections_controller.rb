module Api
  class CollectionsController < ApiController
    def index
      @collections = Collection.all
      render json: @collections
    end
  end
end
