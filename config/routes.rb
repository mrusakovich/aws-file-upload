Rails.application.routes.draw do
  root to: 'application#index'
  get '*path', to: 'application#index', constraints: { path: /(?!api\/v1).*/ }

  namespace :api do
    namespace :v1 do
      resources :uploads, only: [:create, :index] do
        collection do
          delete :clear
        end
      end
    end
  end
end
