Rails.application.routes.draw do

  root  'welcome#home'
  
  get '/auth/facebook/callback' => 'sessions#create'
  get     'login',            to: 'sessions#new'
  post    'login',            to: 'welcome#home'
  delete    'logout',           to: 'sessions#destroy'

  resources :users
  resources :reviews
  resources :books


  resources :users do
    resources :books 
    resources :reviews
  end


end
