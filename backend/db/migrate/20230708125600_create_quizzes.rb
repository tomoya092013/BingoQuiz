class CreateQuizzes < ActiveRecord::Migration[7.0]
  def change
    create_table :quizzes do |t|
      t.string :question_title
      t.string :option_a
      t.string :option_b
      t.string :option_c
      t.string :correct_mark
      t.boolean :is_answer_opened

      t.timestamps
    end
  end
end
