import { Action, createReducer, on } from '@ngrx/store';
import { decrement, increment, multiply, divide, reset } from './counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(multiply, (state, { number }) => state * number),
  on(divide, (state, { number }) => state / number),
  on(reset, state => state = initialState)
);

export function counterReducer(state: number = initialState, action: Action) {
  return _counterReducer(state, action);
}