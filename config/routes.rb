Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]


  namespace :api, defaults: { format: :json } do
    resources :products, only: [:index, :show]
    resources :gears, only: [:index, :show]
    resources :collections, only: [:index, :show]
    resources :reviews, only: [:index, :show, :create]
    resources :geartopros, only: [:create]
  end
end
