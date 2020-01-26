import { TestBed } from '@angular/core/testing';

import { FetchMoviesService } from './fetch-movies.service';

describe('FetchMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchMoviesService = TestBed.get(FetchMoviesService);
    expect(service).toBeTruthy();
  });
});
