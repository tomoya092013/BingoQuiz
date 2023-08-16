class CreateGuestSelectAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :guest_select_answers,id: false do |t|
      t.integer :guest_id,primary_key: true
      t.string :question_1_select_mark,null: true
      t.string :question_3_select_mark,null: true
      t.string :question_4_select_mark,null: true
      t.string :question_2_select_mark,null: true
      t.string :question_5_select_mark,null: true
      t.string :question_6_select_mark,null: true
      t.string :question_7_select_mark,null: true
      t.string :question_8_select_mark,null: true
      t.string :question_9_select_mark,null: true

      t.timestamps
    end
  end
end
