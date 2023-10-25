import { atom } from 'recoil';

import { Guest, GuestAnswer, PokemonImage, Quiz } from './types';

const defaultGuestAnswerListState = {
  guest_id: 0,
  guest_name: '',
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
};

export const pokemonImageState = atom<PokemonImage[]>({
  key: 'pokemonImageState',
  default: [],
});

export const guestInfoState = atom<Guest | null>({
  key: 'guestInfoState',
  default: null,
});

export const guestAnswerListState = atom<GuestAnswer>({
  key: 'guestAnswerListState',
  default: defaultGuestAnswerListState,
});

export const quizListState = atom<Quiz[]>({
  key: 'quizListState',
  default: [],
});
