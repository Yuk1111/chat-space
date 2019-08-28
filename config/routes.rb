Rails.application.routes.draw do

  
  devise_for :users
  root 'groups#index'

    resources :users, only: [:index, :edit, :update]
    resources :groups, only: [:new, :create, :edit, :update] do
      resources :messages, only: [:index, :create]
    end
  end
  # messages_controllerのindexアクションがルートパス
  #For details on the DSL available within this file, 
  #see http://guides.rubyonrails.org/routing.html



  # Rails.application.routes.draw do
  #   devise_for :users
  #   root 'groups#index'
  #   resource :user, only: [:edit, :update]
  #   resources :groups, only: [:new, :create, :edit, :update] do
  #     resources :messages, only: [:index, :create]
  #   end
  # end