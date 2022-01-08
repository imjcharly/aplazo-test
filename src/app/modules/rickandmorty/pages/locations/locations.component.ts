import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { LocationsService } from 'src/app/services/rickAndMorty/locations.service';
import { AlertService } from 'src/app/services/alert.service';
import { Store } from '@ngrx/store';
import { Character, Location, AppState } from 'src/app/app.reducers';
import { setListLocation } from 'src/app/actions/location.action';

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
  listLocations: Array<Location> = [];

  // list characters by location
  listCharacters: Array<Character> = [];

  // ShowCharacters
  showCharacters: boolean = false;

  emptyLocation: Location = {
    id: 0,
    name: '',
    type: '',
    dimension: '',
    residents: [],
    url: '',
    created: '',
  };

  // location selected
  locationSelected: Location = this.emptyLocation;

  // name search
  nameSearch: string = '';

  constructor(
    private store: Store<AppState>,
    private characters$: CharactersService,
    private location$: LocationsService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['name']) {
        this.nameSearch = params['name'];
        this.currentPage = 1;
        this.getLocations(this.currentPage);
        this.closeLocationSelected();
      } else {
        this.nameSearch = '';
        this.currentPage = 1;
        this.getLocations(this.currentPage);
      }
    });

    this.store.select('locations').subscribe(locations => {
      console.log('Locations in store', locations);
      this.listLocations = locations;
    });
  }

  async getLocations(page: number) {
    this.isLoading = true;
    if (this.nameSearch !== '') {
      await this.location$.getLocationsByNamePagination(page, this.nameSearch).subscribe((locations) => {
        this.pages = [...Array(locations.info.pages).keys()];
        this.setListLocations(locations.results);
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.setListLocations([]);
      });
    } else {
      await this.location$.getLocationsPagination(page).subscribe((locations) => {
        this.pages = [...Array(locations.info.pages).keys()];
        this.setListLocations(locations.results);
      }, (error) => {
        console.error(error);
        this.alert.showAlert(JSON.stringify(error.error.error), 'info');
        this.pages = [];
        this.setListLocations([]);
      });
    }
  }

  setListLocations(newLocations: Array<Location>) {
    this.store.dispatch(setListLocation({ locations: newLocations }));
    this.isLoading = false;
  }

  async getMultipleCharacters(location: Location) {
    this.isLoading = true;
    const ids: Array<string> = [];
    await location.residents.forEach((character: string) => {
      ids.push(character.replace('https://rickandmortyapi.com/api/character/', ''));
    });
    if (ids.length > 0) {
      this.characters$.getMultipleCharacters(ids).subscribe((characters) => {
        this.listCharacters = Array.isArray(characters) ? characters : [characters];
        this.locationSelected = location;
        this.isLoading = false;
        this.showCharacters = true;
      }, (error) => {
        console.error(error);
        this.listCharacters = [];
        this.isLoading = false;
        this.closeLocationSelected();
      });
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
    this.locationSelected = this.emptyLocation;
  }

  goToCharacterDetail(character: Character) {
    this.router.navigate(['/rick-and-morty/character-detail', character.id]);
  }
}
