import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { AppState, Character } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  id: string = '';
  characterData: Character = {
    created: '',
    episode: [],
    id: 0,
    gender: '',
    image: 'assets/images/404.jpeg',
    location: {
      name: '',
      url: ''
    },
    name: '',
    origin: {
      name: '',
      url: ''
    },
    status: '',
    species: '',
    type: '',
    url: '',
  };
  isLoading: boolean = false;

  lastRoute: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private character$: CharactersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getSingleCharacter();
    this.store.select('route').subscribe(route => {
      this.lastRoute = route;
    });
  }

  getSingleCharacter() {
    this.isLoading = true;
    this.character$.getSingleCharacter(this.id).subscribe(character => {
      this.isLoading = false;
      this.characterData = character;
    }, error => {
      console.error(error);
      this.isLoading = false;
      this.router.navigate(['/rick-and-morty/characters']);
    });
  }

  goBack() {
    this.router.navigateByUrl(this.lastRoute);
  }

}
