import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FetchMoviesService} from '/home/megha/angular-projects/Perpule-Movies/perpule-movies/src/app/services/fetch-movies.service';
import * as configuration from '../../config';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})

export class MovieSearchComponent implements OnInit {
  movie_searched: string;
  list_of_movies: any = [];
  private sub: any;
  constructor(private route: ActivatedRoute, private fetchMovieService: FetchMoviesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.movie_searched = params['name'];
      //console.log(this.movie_searched);
      this.get_movies();
    });
  }

  get_movies = () => {
      this.fetchMovieService.search_movies(this.movie_searched).subscribe((res: any) => {
        this.list_of_movies = res.results;
        console.log(this.list_of_movies);
        
        for(let i = 0; i < this.list_of_movies.length; i++){
          if(this.list_of_movies[i].poster_path === null){
            this.list_of_movies[i].poster_path = 'https://dummyimage.com/32X37/000/fff';
          }
          else{
            this.list_of_movies[i].poster_path = configuration.default_url + this.list_of_movies[i].poster_path;
          }
        }
      
      });
  }

}
