module Api
  class ProducttocolsController < ApiController

    def index
      @producttocols= Producttocol.all
      render json: @producttocols
    end

    def create
      @producttocol = Producttocol.new(producttocol_params)
      if @producttocol.save
        render json: @producttocol
      else
        render json: @producttocol.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @producttocol = Producttocol.find(params[:id])
      @producttocol.destroy
      render json: { message: 'destroyed!' }
    end


    private
    def producttocol_params
      params.require(:producttocol).permit(:product_id,:collection_id)
    end
  end
end
