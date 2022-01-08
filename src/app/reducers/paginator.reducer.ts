import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/paginator.action';


export const initialStatePagination = {
  firstPage: 1,
  currentPage: 1,
  maxPages: 1
};

interface Paginator {
  firstPage: number,
  currentPage: number,
  maxPages: number
};

const _paginatorReducer = createReducer(initialStatePagination,
  on(actions.updateCurrentPage, (state, { page }) =>
    state = {
      firstPage: state.firstPage,
      currentPage: page,
      maxPages: state.maxPages
    }
  ),
  on(actions.setMaxPages, (state, { maxPages }) =>
    state = {
      firstPage: state.firstPage,
      currentPage: state.currentPage,
      maxPages: maxPages
    }
  ),
  on(actions.resetPagination, state => state = initialStatePagination)
);

export function paginatorReducer(state: Paginator = initialStatePagination, action: Action) {
  return _paginatorReducer(state, action);
}
