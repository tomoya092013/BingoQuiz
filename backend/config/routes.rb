Rails.application.routes.draw do
  # action cable server
  mount ActionCable.server => '/cable'

  resources :messages

  get "login/:id" => "login#index"
  resources :quizzes, only: [:index, :show,:create, :update, :destroy] 
end
