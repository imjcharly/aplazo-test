import { createAction, props } from '@ngrx/store';

export const updateCurrentPage = createAction(
  '[Pagination] Set current page for paginator',
  props<{ page: number }>()
);

export const setMaxPages = createAction(
  '[Pagination] Set max pages for paginator',
  props<{ maxPages: number }>()
);

export const resetPagination = createAction('[Pagination] Reset Pagination');


