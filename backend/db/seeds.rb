# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


Quiz.create([
  {question_title: 'もんだい1', option_a: 'いぬ', option_b: 'ねこ', option_c: 'とり', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい2', option_a: '赤', option_b: '青', option_c: '黒', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい3', option_a: 'すごい', option_b: 'やばい', option_c: '最悪', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい4', option_a: 'なんでなん', option_b: 'どういうこと', option_c: 'そーなん？', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい5', option_a: 'パンチ', option_b: 'キック', option_c: 'ジャンプ', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい6', option_a: 'ワンピース', option_b: 'ナルト', option_c: 'ブリーチ', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい7', option_a: 'テニス', option_b: 'サッカー', option_c: 'バスケ', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい8', option_a: '群馬', option_b: '愛知', option_c: '東京', correct_mark: 'A', is_answer_opened: false},
  {question_title: 'もんだい9', option_a: '飛ぶ', option_b: 'もっと飛ぶ', option_c: '飛ばない', correct_mark: 'A', is_answer_opened: false},
])