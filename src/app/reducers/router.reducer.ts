import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/router.actions';

export const initialStateRoute: string = '/rick-and-morty/characters';

const _routeReducer = createReducer(initialStateRoute,
  on(actions.setLastRoute, (state, { route }) => state = route),
);

export function routeReducer(state: string = initialStateRoute, action: Action) {
  return _routeReducer(state, action);
}
