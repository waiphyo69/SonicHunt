module Api
  class ApiController < ApplicationController
    # before_action :require_signed_in!

    def require_signed_in!
      unless signed_in?
        render json: ["You must be signed in to do this"], status: :unauthorized
      end
    end
  end
end
