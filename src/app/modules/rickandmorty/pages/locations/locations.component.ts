import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { LocationsService } from 'src/app/services/rickAndMorty/locations.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  // loader
  isLoading: boolean = false;

  // Paginator
  pages: Array<number> = [];
  currentPage: number = 1;

  // list locations of current page
  listLocations: any = null;

  // list characters by location
  listCharacters: any = [];

  // ShowCharacters
  showCharacters: boolean = false;
  locationSelected: any = [];

  // name search
  nameSearch: string = '';

  constructor(
    private characters$: CharactersService,
    private location$: LocationsService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getLocations(this.currentPage);
    this.route.queryParams.subscribe((params) => {
      if (params['name']) {
        this.nameSearch = params['name'];
        this.getLocations(this.currentPage);
      } else {
        this.nameSearch = '';
        this.currentPage = 1;
        this.getLocations(this.currentPage);
      }
    });
  }

  async getLocations(page: number) {
    this.isLoading = true;

    if (this.nameSearch !== '') {
      await this.location$.getLocationsByNamePagination(page, this.nameSearch).subscribe(response => {
        this.pages = [...Array(response.info.pages).keys()];
        this.listLocations = response.results;
        this.isLoading = false;
      }, error => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.listLocations = [];
        this.isLoading = false;
      });
    } else {
      await this.location$.getLocationsPagination(page).subscribe((locations) => {
        this.pages = [...Array(locations.info.pages).keys()];
        this.listLocations = locations.results;
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
        this.listLocations = [];
      });
    }
  }

  async getMultipleCharacters(location: any) {
    this.isLoading = true;
    const ids: Array<string> = [];
    await location.residents.forEach((character: any) => {
      ids.push(
        character.replace('https://rickandmortyapi.com/api/character/', '')
      );
    });
    if (ids.length > 0) {
      this.characters$.getMultipleCharacters(ids).subscribe(
        (characters) => {
          this.listCharacters = Array.isArray(characters)
            ? characters
            : [characters];
          this.locationSelected = location;
          this.isLoading = false;
          this.showCharacters = true;
        },
        (error) => {
          console.error(error);
          this.listCharacters = [];
          this.isLoading = false;
          this.closeLocationSelected();
        }
      );
    } else {
      this.alert.showAlert('There is no residents in this location', 'info');
      this.listCharacters = [];
      this.isLoading = false;
      this.showCharacters = false;
    }
  }

  setCurrentPage(newPage: number) {
    this.currentPage = newPage;
    this.getLocations(this.currentPage);
  }

  closeLocationSelected() {
    this.showCharacters = false;
    this.locationSelected = [];
  }

  goToCharacterDetail(character: any) {
    this.router.navigate(['/rick-and-morty/character-detail', character.id]);
  }
}
