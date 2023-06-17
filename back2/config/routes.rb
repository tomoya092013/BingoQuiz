Rails.application.routes.draw do
  # get "quizes" => "quizes#index"
  # post "quizes" => "quizes#create"

  get "login/:id" => "login#index"

  resources :quizzes, only: [:index, :show,:create, :update, :destroy] do
    resources :choices, only: [:index, :show, :create, :update]
  end
end
