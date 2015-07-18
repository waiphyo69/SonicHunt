Rails.application.routes.draw do
  root to: 'static_pages#root'

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
    resources :users, only: [:index, :show, :create]
    resources :follows, only: [:create, :index, :destroy]
  end
end
