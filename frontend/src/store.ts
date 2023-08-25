import jwt_decode from 'jwt-decode';
import { atom, selector } from 'recoil';
import { PokemonImage, Guest, GuestAnswer, WsAdminAnswer, Quiz } from './types';

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

const defaultWsAdminAnswerList: WsAdminAnswer[] = [
  { quizId: 1, answer: '' },
  { quizId: 2, answer: '' },
  { quizId: 3, answer: '' },
  { quizId: 4, answer: '' },
  { quizId: 5, answer: '' },
  { quizId: 6, answer: '' },
  { quizId: 7, answer: '' },
  { quizId: 8, answer: '' },
  { quizId: 9, answer: '' },
];

export const pokemonImageState = atom<PokemonImage[]>({
  key: 'pokemonImageState',
  default: [],
});

export const jwtTokenState = atom<string>({
  key: 'jwtTokenState',
  default: '',
});

export const guestInfoSelector = selector<Guest>({
  key: 'guestInfoSelector',
  get: ({ get }) => jwt_decode(get(jwtTokenState)) as Guest,
});

export const guestAnswerListState = atom<GuestAnswer>({
  key: 'guestAnswerListState',
  default: defaultGuestAnswerListState,
});

export const wsAdminAnswerState = atom<WsAdminAnswer[]>({
  key: 'wsAdminAnswerState',
  default: defaultWsAdminAnswerList,
});

export const quizListState = atom<Quiz[]>({
  key: 'quizListState',
  default: [],
});
