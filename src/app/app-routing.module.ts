import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviePageComponent} from './components/movie-page/movie-page.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import { MovieSearchComponent} from './components/movie-search/movie-search.component';

const routes: Routes = [
  {path: '',  redirectTo: 'movie-list', pathMatch: 'full'},
  {path: 'movie-list', component: MovieListComponent},
  {path: 'movie-page/:id', component: MoviePageComponent},
  {path: 'movie-search/:name', component: MovieSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
