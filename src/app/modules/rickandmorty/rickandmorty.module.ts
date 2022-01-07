import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickandmortyRoutingModule } from './rickandmorty-routing.module';

import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { CharactersComponent } from './pages/characters/characters.component';

import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { GenericCardComponent } from 'src/app/components/generic-card/generic-card.component';


@NgModule({
  declarations: [
    EpisodesComponent,
    CharacterDetailComponent,
    LocationsComponent,
    CharactersComponent,
    GenericCardComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RickandmortyRoutingModule,

  ],
  exports: [
    LoaderComponent,
    GenericCardComponent
  ]
})
export class RickandmortyModule { }
