Rails.application.routes.draw do
  # action cable server
  mount ActionCable.server => '/cable'

  resources :messages

  resources :enquetes, only: [:index]
  post '/enquete/:guest_id', to: 'enquetes#create_or_update'
  get "login/:name" => "login#index"
  resources :guest_select_answer, only: [:index, :show, :create, :update]
  resources :quizzes, only: [:index, :show, :create, :update, :destroy] do
    collection do
      post :clear_all_opened_answer
    end
  end
end
