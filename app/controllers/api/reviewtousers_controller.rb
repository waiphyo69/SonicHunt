module Api
  class ReviewtousersController < ApiController

    def index
      @reviewtousers= Reviewtouser.all
      render json: @reviewtousers
    end

    def create
      @reviewtouser = Reviewtouser.new(reviewtouser_params)
      if @reviewtouser.save
        render json: @reviewtouser
      else
        render json: @reviewtouser.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @reviewtouser = Reviewtouser.find(params[:id])
      @reviewtouser.destroy
      render json: { message: 'destroyed!' }
    end

    private
    def reviewtouser_params
      params.require(:reviewtouser).permit( :review_id, :upvoter_id )
    end
  end
end
