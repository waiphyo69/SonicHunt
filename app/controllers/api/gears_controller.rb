module Api
  class GearsController < ApiController
    def index
      @gears= Gear.all
      render json: @gears
    end
  end
end
