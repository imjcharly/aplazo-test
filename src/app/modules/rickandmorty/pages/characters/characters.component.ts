import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  // loader
  isLoading: boolean = false;

  // Pagination
  pages: Array<number> = [];
  currentPage: number = 1;

  // list characters of current page
  listCharacters: any = null;

  // name search
  nameSearch: string = '';

  constructor(
    private characters$: CharactersService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.nameSearch = params['name'];
        this.getCharacters(this.currentPage);
      } else {
        this.nameSearch = '';
        this.currentPage = 1;
        this.getCharacters(this.currentPage);
      }
    });

  }

  async getCharacters(page: number) {
    this.isLoading = true;
    if (this.nameSearch !== '') {
      await this.characters$.getCharactersByNamePagination(page, this.nameSearch).subscribe(response => {
        this.pages = [...Array(response.info.pages).keys()];
        this.listCharacters = response.results;
        this.isLoading = false;
      }, error => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.listCharacters = [];
        this.isLoading = false;
      });
    } else {
      await this.characters$.getCharactersPagination(page).subscribe(response => {
        this.pages = [...Array(response.info.pages).keys()];
        this.listCharacters = response.results;
        this.isLoading = false;
      }, error => {
        console.error(error);
        this.pages = [];
        this.listCharacters = [];
        this.isLoading = false;
      });
    }
  }

  searchCharacters(name: string) {
    this.isLoading = true;
    this
  }

  setCurrentPage(newPage: number) {
    this.currentPage = newPage;
    this.getCharacters(this.currentPage);
  }

  goToCharacterDetail(character: any) {
    this.router.navigate(['/rick-and-morty/character-detail', character.id]);
  }

}
