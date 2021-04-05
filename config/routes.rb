require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

  root to: 'bucket#index'

  resource :bucket, only: [:index], controller: :bucket do
    put :upload
    get :clear
  end

  resources :uploads, only: [:index]
end
