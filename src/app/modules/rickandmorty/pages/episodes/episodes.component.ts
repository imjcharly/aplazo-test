import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EpisodesService } from 'src/app/services/rickAndMorty/episodes.service';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { AlertService } from 'src/app/services/alert.service';

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
  listEpisodes: any = null;

  // list characters by episode
  listCharacters: any = [];

  // ShowCharacters
  showCharacters: boolean = false;
  episodeSelected: any = [];

  // name search
  nameSearch: string = '';

  constructor(
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
        this.getEpisodes(this.currentPage);
      } else {
        this.nameSearch = '';
        this.currentPage = 1;
        this.getEpisodes(this.currentPage);
      }
    });
  }

  async getEpisodes(page: number) {
    this.isLoading = true;
    if (this.nameSearch !== '') {
      await this.episodes$.getEpisodesByNamePagination(page, this.nameSearch).subscribe((response) => {
        this.pages = [...Array(response.info.pages).keys()];
        this.listEpisodes = response.results;
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.listEpisodes = [];
        this.isLoading = false;
      });
    } else {
      await this.episodes$.getEpisodesPagination(page).subscribe((response) => {
        this.pages = [...Array(response.info.pages).keys()];
        this.listEpisodes = response.results;
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.pages = [];
        this.listEpisodes = [];
        this.isLoading = false;
      });
    }
  }

  async getMultipleCharacters(episode: any) {
    this.isLoading = true;
    const ids: Array<string> = [];
    await episode.characters.forEach((character: any) => {
      ids.push(
        character.replace('https://rickandmortyapi.com/api/character/', '')
      );
    });
    if (ids.length > 0) {
      this.characters$.getMultipleCharacters(ids).subscribe((characters) => {
        this.listCharacters = Array.isArray(characters)
          ? characters
          : [characters];
        this.episodeSelected = episode;
        this.isLoading = false;
        this.showCharacters = true;
      }, (error) => {
        console.error(error);
        this.listCharacters = [];
        this.isLoading = false;
        this.closeEpisodeSelected();
      });
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
    this.episodeSelected = [];
  }

  goToCharacterDetail(character: any) {
    this.router.navigate(['/rick-and-morty/character-detail', character.id]);
  }
}
