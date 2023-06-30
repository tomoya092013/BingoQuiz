class CreateQuizzes < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes do |t|
      # t.number :id
      t.string :content
      t.string :correct_mark
      t.boolean :is_ancer_opened
      t.timestamps
    end
  end
end
