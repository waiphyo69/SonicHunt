module Api
  class GeartoprosController < ApiController
    def create
      @geartopro = Geartopro.new(geartopro_params)
      if @geartopro.save
        render json: @geartopro
      else
        render json: @geartopro.errors.full_messages, status: :unprocessable_entity
      end
    end
    private
    def geartopro_params
      params.require(:geartopro).permit(:gear_id,:product_id)
    end
  end
end
