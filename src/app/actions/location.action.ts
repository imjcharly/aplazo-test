import { createAction, props } from '@ngrx/store';
import { Location } from '../app.reducers';

export const setListLocation = createAction(
  '[Location] Set current list of locations',
  props<{ locations: Array<Location> }>()
);
