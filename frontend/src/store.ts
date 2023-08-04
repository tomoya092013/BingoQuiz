import jwt_decode from 'jwt-decode';
import { atom, selector } from 'recoil';

import { PokemonImage, User } from './types';

export const pokemonImageState = atom<PokemonImage[]>({
  key: 'pokemonImageState',
  default: [],
});

export const jwtTokenState = atom<string>({
  key: 'jwtTokenState',
  default: 'eyJhbGciOiJub25lIn0.eyJpZCI6IjQ1NiIsIm5hbWUiOiJHdWVzdDIifQ.',
});

export const userInfoSelector = selector<User>({
  key: 'userInfoSelector',
  get: ({ get }) => {
    return jwt_decode(get(jwtTokenState)) as User;
  },
});
