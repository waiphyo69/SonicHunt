Rails.application.routes.draw do
  root to: 'static_pages#root'

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

  namespace :api, defaults: { format: :json } do
    resources :products, only: [:index, :show, :update]
    resources :gears, only: [:index, :show, :create, :update, :destroy]
    resources :collections, only: [:index, :show, :create, :destroy]
    resources :reviews, only: [:index, :show, :create, :update, :destroy]
    resources :geartopros, only: [:create]
    resources :producttocols, only: [:create, :index, :destroy]
    resources :geartocols, only: [:create, :index, :destroy]
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:index, :show, :create, :update]
    resources :follows, only: [:create, :index, :destroy]
    resources :geartousers, only: [:create, :index, :destroy]
    resources :reviewtousers, only: [:create, :index, :destroy]
  end
end
