import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from 'src/app/services/rickAndMorty/characters.service';
import { Character } from 'src/app/app.reducers';

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
    image: '',
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

  constructor(
    private router: Router,
    private character$: CharactersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getSingleCharacter();
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
    window.history.back();
  }

}
