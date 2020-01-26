import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FetchMoviesService} from '/home/megha/angular-projects/Perpule-Movies/perpule-movies/src/app/services/fetch-movies.service';
import { Observable, config } from 'rxjs';
import * as configuration from '../../config';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})

export class MoviePageComponent implements OnInit {
  id: number;
  private sub: any;
  movie_details: any={};

  private productsObservable : Observable<any[]> ; 
  constructor(private route: ActivatedRoute, private fetchMovieService: FetchMoviesService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.get_details(this.id);
    });
    /*let id1= parseInt(this.route.snapshot.paramMap.get('id'));
    this.id= id1;

    this.get_details(this.id);*/
  }

  get_details = (id: number) => {
    this.fetchMovieService.fetchMovieDetails(this.id).subscribe((res: any)=>{
      this.movie_details = res;
      this.movie_details.backdrop_path = configuration.default_url + this.movie_details.backdrop_path;
      console.log(this.movie_details);
    });
  }

}
