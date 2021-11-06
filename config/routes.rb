Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do 
    namespace :v1 do 
      resources :airlines, param: :slug
      resources :reviews, only: [:create, :destroy]
    end
  end

  # this *path is routed to pages#index
  # this will route requests that were not predefined in our API back to our
  # index path and the reason is once we start to use 
  # react router it will allow us to basically handle routing to our react components without interfering
  # with our actual rails routes for our API
  
  get '*path', to: 'pages#index', via: :all
end
