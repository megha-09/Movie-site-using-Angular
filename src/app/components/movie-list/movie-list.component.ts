import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import {FetchMoviesService} from '../../services/fetch-movies.service';
import * as config from '../../../app/config';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {
  next_count = 0;
  back_count = 0;
  pageNumber: number=0;
  total_pages: number;
  records_per_page=10;
  movies_only: any= [];
  filters = ['popularity', 'vote_average'];
  selected_filter: string = '';
  inputPageNumber: number;
  
  private productsObservable : Observable<any[]> ; 
  constructor(private fetchMovieService: FetchMoviesService, private route: ActivatedRoute, private router: RouterModule) { }

  ngOnInit() {
    this.get_movies();
  }
 
  get_movies = () => {
    if(this.inputPageNumber){
       this.pageNumber = this.inputPageNumber;
       this.next_count = this.inputPageNumber-1;
       this.back_count = 0;
    }
    else this.pageNumber = this.next_count - this.back_count + 1;
    //console.log("pagenumber" , this.pageNumber, "back count", this.back_count, "next count", this.next_count);
      this.fetchMovieService.pagination(this.records_per_page , this.pageNumber).subscribe((res: any) => {
          this.movies_only = res.results; 
          if(this.selected_filter) this.filter_function();            
          
          for(let i = 0; i < this.movies_only.length; i++){
            if(this.movies_only[i].poster_path === null){
              this.movies_only[i].poster_path = "https://dummyimage.com/200X240/000/fff";
              this.movies_only[i].overview  = this.movies_only[i].title + "- " + this.movies_only[i].overview;
            }
            else{
              this.movies_only[i].poster_path = config.default_url + this.movies_only[i].poster_path;
            }
          }
          
          this.total_pages = res.total_results/res.results.length; 
          console.log(this.movies_only);
      });
  }
  
  clicked = (button: string) => {
    this.inputPageNumber = 0;
    if(button == 'back'){
      if(this.next_count > this.back_count) this.back_count++; 
        this.get_movies();
    }
    if(button == 'next'){
      this.next_count++;
      this.get_movies();
    }
  }

  compare = (a, b) => {
    if (a[this.selected_filter] < b[this.selected_filter])
      return 1;
    if (a[this.selected_filter] > b[this.selected_filter])
      return -1;
    return 0;
  }

  filter_function = () => {
    this.movies_only.sort(this.compare); 
  }

  input_pagenumber = (pg: number)=>{
      this.inputPageNumber = pg; 
      if(this.inputPageNumber > 0 && this.inputPageNumber < 501) 
      {
        this.get_movies();
      }
  }
}



