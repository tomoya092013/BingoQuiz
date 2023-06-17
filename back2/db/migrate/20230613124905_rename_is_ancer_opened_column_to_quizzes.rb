class RenameIsAncerOpenedColumnToQuizzes < ActiveRecord::Migration[7.0]
  def change
    rename_column :quizzes, :is_ancer_opened, :is_answer_opened

  end
end
