module Api
  class GearsController < ApiController
    def index
      @gears= Gear.all
      render json: @gears
    end

    def show
      @gear = Gear.find(params[:id])
      render :show
    end
  end
end
