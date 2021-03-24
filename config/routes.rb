Rails.application.routes.draw do
  root to: 'bucket#index'

  resource :bucket, only: [:index], controller: :bucket do
    post :upload
  end
end
