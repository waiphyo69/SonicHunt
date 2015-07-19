module Api
  class GeartousersController < ApiController

    def index
      @geartousers= Geartouser.all
      render json: @geartousers
    end

    def create
      @geartouser = Geartouser.new(geartouser_params)
      if @geartouser.save
        render json: @geartouser
      else
        render json: @geartouser.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @geartouser = Geartouser.find(params[:id])
      @geartouser.destroy
      render json: { message: 'destroyed!' }
    end

    private
    def geartouser_params
      params.require(:geartouser).permit( :gear_id, :subscriber_id )
    end
  end
end
