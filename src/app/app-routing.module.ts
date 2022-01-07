import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'rick-and-morty',
    loadChildren: () => import('./modules/rickandmorty/rickandmorty.module').then(m => m.RickandmortyModule)
  },
  { path: '**', redirectTo: 'rick-and-morty' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
