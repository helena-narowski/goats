Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  devise_scope :user do
    get '/users/current_user', to: 'users/sessions#current'
  end

  # get '/', to: 'home#index'
  root to: 'home#index'

  # get '/home', to: 'home#index'

  resources :goals
  resources :logs, except: :show
  resources :teams

  get '/logs/team_logs', to: 'logs#team_logs'
  # get 'login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # Catchall route that redirects user to the root path
  # match '*path', to: 'home#index', via: :all
  # match '*path', to: '/', via: :all
  get '*path', to: 'home#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
