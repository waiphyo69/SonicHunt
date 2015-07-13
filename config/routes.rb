Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]


  namespace :api, defaults: { format: :json } do
    resources :products, only: [:index]
    resources :gears, only: [:index]
    resources :collections, only: [:index]
    resources :reviews, only: [:index]
  end
end
