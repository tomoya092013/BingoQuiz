# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_27_150835) do
  create_table "enquetes", primary_key: "guest_id", force: :cascade do |t|
    t.integer "enquete_1"
    t.integer "enquete_2"
    t.integer "enquete_3"
    t.integer "enquete_4"
    t.integer "enquete_5"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "guest_select_answers", primary_key: "guest_id", force: :cascade do |t|
    t.string "guest_name"
    t.string "question_1_select_mark"
    t.string "question_3_select_mark"
    t.string "question_4_select_mark"
    t.string "question_2_select_mark"
    t.string "question_5_select_mark"
    t.string "question_6_select_mark"
    t.string "question_7_select_mark"
    t.string "question_8_select_mark"
    t.string "question_9_select_mark"
    t.boolean "bingo", default: false
    t.integer "correct_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "question_title"
    t.string "option_a"
    t.string "option_b"
    t.string "option_c"
    t.string "correct_mark"
    t.boolean "is_answer_opened"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
