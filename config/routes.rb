Rails.application.routes.draw do
  get "/auth/:provider/callback", to: "sessions#create"
  get 'auth/failure', to: redirect('/')
  delete 'signout', to: 'sessions#destroy', as: 'signout'
  get '/authorize/', to: 'sessions#new'

  get 'sessions/new'

  get 'sessions/create'

  get 'sessions/destroy'

  get 'welcome/index'
  root 'welcome#index'

  scope '/api/' do
    scope '/v1/' do
      resources :orders do
        collection do
          get '/active/', to: 'orders#active'
          get '/history/', to: 'orders#history'
        end

        member do
          get '/meals/', to: 'orders#meals'
        end
      end

      resources :meals
      get '/me/', to: 'sessions#current'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
