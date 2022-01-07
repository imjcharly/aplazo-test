import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const multiply = createAction(
  '[Counter] Multiply',
  props<{ number: number }>()
);
export const divide = createAction(
  '[Counter] Divide',
  props<{ number: number }>()
);