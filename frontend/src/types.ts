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
  guest_id: number;
  guest_name: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  bingo?: boolean;
  correct_count?: number;
};

export type WsAdminAnswer = { quizId: number; answer: 'A' | 'B' | 'C' | '' };

export type EnqueteTotal = { tomoya: number; miki: number };
