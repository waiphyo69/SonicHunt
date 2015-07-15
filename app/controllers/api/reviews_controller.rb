module Api
  class ReviewsController < ApiController
    def index
      @reviews= Review.all
      render json: @reviews
    end

    def show
      @review = Review.find(params[:id])
      render :show
    end

    def create
      @review = Review.new(review_params)
      if @review.save
        render json: @review
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def review_params
      params.require(:review).permit(:id, :owner_id, :product_id, :description, :title, :score)
    end
  end
end
