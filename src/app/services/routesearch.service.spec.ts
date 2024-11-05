import { TestBed } from '@angular/core/testing';

import { RoutesearchService } from './routesearch.service';

describe('RoutesearchService', () => {
  let service: RoutesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
