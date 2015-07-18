module Api
  class FollowsController < ApiController

    def index
      @follows= Follow.all
      render json: @follows
    end

    def create
      @follow = Follow.new(follow_params)
      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @follow = Follow.find(params[:id])
      @follow.destroy
      render json: { message: 'destroyed!' }
    end

    private
    def follow_params
      params.require(:follow).permit( :follower_id, :followee_id )
    end
  end
end
