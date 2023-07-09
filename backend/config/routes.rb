Rails.application.routes.draw do
  # get "quizes" => "quizes#index"
  # post "quizes" => "quizes#create"
  get "login/:id" => "login#index"
  resources :quizzes, only: [:index, :show,:create, :update, :destroy] 
end
