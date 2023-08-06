Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
  # get '/', to: 'home#index'
  root to: 'home#index'

  resources :goals
  resources :logs
  resources :teams
  # get 'login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
