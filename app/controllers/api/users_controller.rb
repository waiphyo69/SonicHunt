module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render :index
    end

    def show
      @user = User.find(params[:id])
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

    private

    def user_params
      self.params.require(:user).permit(:username, :email, :password)
    end
  end
end
