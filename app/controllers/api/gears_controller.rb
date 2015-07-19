module Api
  class GearsController < ApiController
    def index
      @gears = Gear.all
      if current_user
        @upvoted_gear_hash = current_user.gear_upvote_hash
      else
        @upvoted_gear_hash = {}
      end
      render :index
    end

    def show
      @gear = Gear.find(params[:id])
      @upvoted_gear_hash = {}
      if current_user
        @upvoted_gear_hash[@gear.id] = @gear.subscribeds.find_by(subscriber_id: current_user.id)
      end
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

    def update
      @gear = Gear.find(params[:id])
      if @gear.update(gear_params)
        render json: @gear
      else
        render json: @gear.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @gear = Gear.find(params[:id])
      @gear.destroy
      render json: { message: 'destroyed!' }
    end

    private
    def gear_params
      params.require(:gear).permit(:id, :owner_id, :title, :impression, :image_url, :popularity)
    end
  end
end
