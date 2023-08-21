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

export type Guest = {
  id: number;
  name: string;
};

export type GuestAnswer = {
  guestId: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
};
