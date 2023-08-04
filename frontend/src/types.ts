export type Quiz = {
  id: number;
  question_title: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_mark: string;
  is_answer_opened: boolean;
  created_at: Date;
  updated_at: Date;
};

export type PokemonImage = {
  url: string;
};

export type User = {
  id: number;
  name: string;
};
