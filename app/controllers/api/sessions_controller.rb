module Api
  class SessionsController < ApplicationController

    def show
      if current_user
        render :show
      else
        render json: {}
      end
    end

    def create
      user = User.find_by_credentials(
                    params[:user][:username],
                    params[:user][:password])

      if user.nil?
        head :unprocessable_entity
      else
        sign_in!(user)
        render :show
      end
    end

    def omniauth
      user = User.find_or_create_by_auth_hash(auth_hash)
      sign_in!(user)
      redirect_to "#/products"
    end


    def destroy
      sign_out!
      render json: {}
    end

    protected

    def auth_hash
      request.env['omniauth.auth']
    end
  end
end
