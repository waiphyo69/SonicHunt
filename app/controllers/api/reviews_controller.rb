module Api
  class ReviewsController < ApiController
    def index
      @reviews= Gear.all
      render json: @reviews
    end
  end
end
