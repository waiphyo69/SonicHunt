module Api
  class ReviewsController < ApiController
    def index
      @reviews= Review.all
      render json: @reviews
    end

    def show
      @review = Review.find(id)
      render :show
    end
  end
end
