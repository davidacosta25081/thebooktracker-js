Rails.application.routes.draw do

  root  'welcome#home'
  
  
  get '/auth/facebook/callback' => 'sessions#create'
  get     'login',            to: 'sessions#new'
  post    'login',            to: 'sessions#create'
  delete    'logout',           to: 'sessions#destroy'

  resources :users
  resources :reviews
  resources :books


  resources :books do 
    resources :reviews
  end 
   



end
