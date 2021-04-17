Rails.application.routes.draw do
  root to: 'application#index'
  get '*path', to: 'application#index'

  namespace :api do
    namespace :v1 do
      resource :uploads, only: [:create, :index] do
        delete :clear
      end
    end
  end
end
