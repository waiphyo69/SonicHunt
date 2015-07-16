module Api
  class CollectionsController < ApiController
    def index
      @collections = Collection.all
      render json: @collections
    end

    def show
      @collection = Collection.find(params[:id])
    end

    def create
      @collection = Collection.new(collection_params)
      if @collection.save
        render json: @collection
      else
        render json: @collection.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @collection = Collection.find(params[:id]
      if @collection.update(collection_params)
        render json: @collection
      else
        render json: @collection.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def collection_params
      params.require(:collection).permit(:owner_id, :image_url, :title)
    end
  end
end
