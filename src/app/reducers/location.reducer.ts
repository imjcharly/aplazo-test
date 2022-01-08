import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/location.action';
import { Location } from 'src/app/app.reducers';

export const initialStateListLocations: Array<Location> = [];

const _locationReducer = createReducer(initialStateListLocations,
  on(actions.setListLocation, (state, { locations }) => state = locations),
);

export function locationReducer(state: Array<Location> = initialStateListLocations, action: Action) {
  return _locationReducer(state, action);
}
