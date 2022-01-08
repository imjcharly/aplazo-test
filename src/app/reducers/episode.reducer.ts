import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/episode.action';
import { Episode } from 'src/app/app.reducers';

export const initialStateListEpisodes: Array<Episode> = [];

const _episodeReducer = createReducer(initialStateListEpisodes,
  on(actions.setListEpisode, (state, { episodes }) => state = episodes),
);

export function episodeReducer(state: Array<Episode> = initialStateListEpisodes, action: Action) {
  return _episodeReducer(state, action);
}
