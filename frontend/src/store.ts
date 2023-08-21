import jwt_decode from 'jwt-decode';
import { atom, selector } from 'recoil';
import { PokemonImage, Guest, GuestAnswer } from './types';

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
