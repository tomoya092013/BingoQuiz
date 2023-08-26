import { atom } from 'recoil';
import { PokemonImage, GuestAnswer, Quiz, Guest } from './types';

const defaultGuestAnswerListState = {
  guestId: 0,
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
