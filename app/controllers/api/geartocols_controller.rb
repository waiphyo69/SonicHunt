module Api
  class GeartocolsController < ApiController
    def create
      @geartocol = Geartocol.new(geartocol_params)
      if @geartocol.save
        render json: @geartocol
      else
        render json: @geartocol.errors.full_messages, status: :unprocessable_entity
      end
    end
    private
    def geartocol_params
      params.require(:geartocol).permit(:gear_id,:collection_id)
    end
  end
end
