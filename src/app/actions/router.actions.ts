import { createAction, props } from '@ngrx/store';

export const setLastRoute = createAction(
  '[Router] Set last route visited in page',
  props<{ route: string }>()
);
