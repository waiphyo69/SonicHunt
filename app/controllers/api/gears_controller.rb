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

    def create
      @gear = Gear.new(gear_params)
      if @gear.save
        render json: @gear
      else
        render json: @gear.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
    def gear_params
      params.require(:gear).permit(:id, :owner_id, :title, :impression, :image_url, :popularity)
    end
  end
end
