module Api
  class GeartoprosController < ApiController
    def create
      @geartopro = Geartopro.find(params[:id])
    if @geartopro.save
      render json: @geartopro
    else
      render json: @geartopro.errors.full_messages, status: :unprocessable_entity
    end
  end
end
