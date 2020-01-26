import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchedMovie: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchMovie = () => {
    this.router.navigate(['/movie-search', this.searchedMovie]);
    this.searchedMovie = "";
  }

}
