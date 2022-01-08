import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/character.action';
import { Character } from 'src/app/app.reducers';

export const initialStateListCharacters: Array<Character> = [];

const _characterReducer = createReducer(initialStateListCharacters,
  on(actions.setListCharacter, (state, { characters }) => state = characters),
);

export function characterReducer(state: Array<Character> = initialStateListCharacters, action: Action) {
  return _characterReducer(state, action);
}
