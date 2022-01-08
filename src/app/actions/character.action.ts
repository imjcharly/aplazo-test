import { createAction, props } from '@ngrx/store';
import { Character } from '../app.reducers';

export const setListCharacter = createAction(
  '[Character] Set current list of characters',
  props<{ characters: Array<Character> }>()
);
