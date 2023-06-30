class AddNoToQuizzes < ActiveRecord::Migration[7.0]
  def change
    add_column :quizzes, :no, :integer
  end
end
