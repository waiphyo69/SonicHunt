module Api
  class UsersController < ApplicationController

    wrap_parameters false

    def index
      @users = User.all
      render :index
    end

    def show
      @user = User.find(params[:id])
      @followee_hash = {}
      if (current_user)
        @followee_hash[@user.id] = @user.follower_follows.find_by(follower_id: current_user.id)
      end
      render :show
    end

    def create
      @user = User.new(user_params)

      if @user.save
        sign_in!(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @user = User.find(params[:id])

      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def user_params
      self.params.require(:user).permit(:username, :email, :password, :image)
    end
  end
end
