import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/app.reducers';
import { AlertService } from 'src/app/services/alert.service';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { setListCharacter } from '../../../../actions/character.action';
import { setLastRoute } from 'src/app/actions/router.actions';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  // loader
  isLoading: boolean = false;

  // Pagination
  pages: Array<number> = [];
  currentPage: number = 1;

  // list characters of current page
  listCharacters: Array<Character> = [];

  // name search
  nameSearch: string = '';

  constructor(
    private store: Store<AppState>,
    private characters$: CharactersService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['name']) {
        this.nameSearch = params['name'];
        this.currentPage = 1;
        this.getCharacters(this.currentPage);
      } else {
        this.nameSearch = '';
        this.currentPage = 1;
        this.getCharacters(this.currentPage);
      }
    });

    // store characters
    this.store.select('characters').subscribe(characters => {
      this.listCharacters = characters;
    });
  }

  async getCharacters(page: number) {
    this.isLoading = true;
    if (this.nameSearch !== '') {
      await this.characters$.getCharactersByNamePagination(page, this.nameSearch).subscribe((response) => {
        this.pages = [...Array(response.info.pages).keys()];
        this.setListCharacters(response.results);
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.setListCharacters([]);
      }
      );
    } else {
      await this.characters$.getCharactersPagination(page).subscribe((characters) => {
        this.pages = [...Array(characters.info.pages).keys()];
        this.setListCharacters(characters.results);
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.setListCharacters([]);
      }
      );
    }
  }

  setListCharacters(newCharacters: Array<Character>) {
    this.store.dispatch(setListCharacter({ characters: newCharacters }));
    this.isLoading = false;
  }

  setCurrentPage(newPage: number) {
    this.currentPage = newPage;
    this.getCharacters(this.currentPage);
  }

  goToCharacterDetail(character: Character) {
    this.store.dispatch(setLastRoute({ route: this.router.url }));
    this.router.navigate(['/rick-and-morty/character-detail', character.id]);
  }
}
