Rails.application.routes.draw do
  # action cable server
  mount ActionCable.server => '/cable'

  resources :messages

  get "login/:name" => "login#index"
  resources :quizzes, only: [:index, :show,:create, :update, :destroy] do
    collection do
      post :clear_all_opened_answer
    end
  end
end
