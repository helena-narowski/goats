Rails.application.routes.draw do
  devise_for :users
  # get '/', to: 'home#index'
  root to: 'home#index'
  # get 'login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
