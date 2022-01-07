import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { LocationsComponent } from './pages/locations/locations.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // Characters
      { path: 'characters', component: CharactersComponent },
      { path: 'characters/:name', component: CharactersComponent },
      { path: 'character-detail/:id', component: CharacterDetailComponent },
      // Episodes
      { path: 'episodes', component: EpisodesComponent },
      { path: 'episodes/:name', component: EpisodesComponent },
      // Locations
      { path: 'locations', component: LocationsComponent },
      { path: 'locations/:name', component: LocationsComponent },

      // extra
      { path: '**', redirectTo: 'characters' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class RickandmortyRoutingModule { }
