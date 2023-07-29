import { atom } from 'recoil';
import { PokemonImage } from './types';

export const pokemonImageState = atom<PokemonImage[]>({
  key: 'pokemonImageState',
  default: [],
});
