import { createAction, props } from '@ngrx/store';
import { Episode } from '../app.reducers';

export const setListEpisode = createAction(
  '[Episode] Set current list of episodes',
  props<{ episodes: Array<Episode> }>()
);
