import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EpisodesService } from 'src/app/services/rickAndMorty/episodes.service';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { AlertService } from 'src/app/services/alert.service';
import { Episode } from 'src/app/app.reducers';
import { Character, AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { setListEpisode } from 'src/app/actions/episode.action';
import { setLastRoute } from 'src/app/actions/router.actions';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
  // Loader
  isLoading: boolean = false;

  // Pagination
  pages: Array<number> = [];
  currentPage: number = 1;

  // List episodes of current page
  listEpisodes: Array<Episode> = [];

  // list characters by episode
  listCharacters: Array<Character> = [];

  // ShowCharacters
  showCharacters: boolean = false;

  emptyEpisode: Episode = {
    id: 0,
    name: '',
    air_date: '',
    episode: '',
    characters: [],
    url: '',
    created: '',
  };

  episodeSelected: Episode = this.emptyEpisode;

  // name search
  nameSearch: string = '';

  constructor(
    private store: Store<AppState>,
    private characters$: CharactersService,
    private episodes$: EpisodesService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['name']) {
        this.nameSearch = params['name'];
        this.currentPage = 1;
        this.getEpisodes(this.currentPage);
        this.closeEpisodeSelected();
      } else {
        this.nameSearch = '';
        this.currentPage = 1;
        this.getEpisodes(this.currentPage);
      }
    });

    this.store.select('episodes').subscribe(episodes => {
      this.listEpisodes = episodes;
    });
  }

  async getEpisodes(page: number) {
    this.isLoading = true;
    if (this.nameSearch !== '') {
      await this.episodes$.getEpisodesByNamePagination(page, this.nameSearch).subscribe((episodes) => {
        this.pages = [...Array(episodes.info.pages).keys()];
        this.setListEpisodes(episodes.results)
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.setListEpisodes([]);
      });
    } else {
      await this.episodes$.getEpisodesPagination(page).subscribe((episodes) => {
        this.pages = [...Array(episodes.info.pages).keys()];
        this.setListEpisodes(episodes.results);
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.setListEpisodes([]);
      }
      );
    }
  }

  setListEpisodes(newEpisodes: Array<Episode>) {
    this.store.dispatch(setListEpisode({ episodes: newEpisodes }));
    this.isLoading = false;
  }

  async getMultipleCharacters(episode: Episode) {
    this.isLoading = true;
    const ids: Array<string> = [];
    await episode.characters.forEach((character: string) => {
      ids.push(
        character.replace('https://rickandmortyapi.com/api/character/', '')
      );
    });
    if (ids.length > 0) {
      this.characters$.getMultipleCharacters(ids).subscribe((characters: Character) => {
        this.listCharacters = Array.isArray(characters) ? characters : [characters];
        this.episodeSelected = episode;
        this.isLoading = false;
        this.showCharacters = true;
      }, (error) => {
        console.error(error);
        this.listCharacters = [];
        this.isLoading = false;
        this.closeEpisodeSelected();
      }
      );
    } else {
      this.alert.showAlert('There is no characters in this episode', 'info');
      this.listCharacters = [];
      this.isLoading = false;
      this.showCharacters = false;
    }
  }

  setCurrentPage(newPage: number) {
    this.currentPage = newPage;
    this.getEpisodes(this.currentPage);
  }

  closeEpisodeSelected() {
    this.showCharacters = false;
    this.episodeSelected = this.emptyEpisode;
  }

  goToCharacterDetail(character: Character) {
    this.store.dispatch(setLastRoute({ route: this.router.url }));
    this.router.navigate(['/rick-and-morty/character-detail', character.id]);
  }
}
