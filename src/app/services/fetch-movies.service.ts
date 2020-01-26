import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class FetchMoviesService {
Header: object;
  constructor(private httpClient: HttpClient) { }
  public returnHeaderHandler =() =>{
    return this.Header ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  };


  fetch_movies = (pageNumber: number) =>{
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=${config.Secret_Key}&language=en-US&page=${pageNumber}`, this.returnHeaderHandler())
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      }));
  };

  pagination= (records_per_page: number, pageNumber: number)=>{
   return this.fetch_movies(pageNumber); 
  };

  fetchMovieDetails= (movie_id: number)=>{
  return this.httpClient.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${config.api_key}&language=en-US`, this.returnHeaderHandler())
  .pipe(
    map((res: any) => {
      return res;
    }),
    catchError(err => {
      console.log(err);
      return throwError(err);
    }));
};

  search_movies=(movie_name: string)=>{
    console.log(movie_name);   
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.api_key_searched_movie}&language=en-US&query=${movie_name}&page=1&include_adult=false`, this.returnHeaderHandler())
    .pipe(
      map((res: any) => {
        //console.log(res);
        return res;        
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      }));
  };

}
