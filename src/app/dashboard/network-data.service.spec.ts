import { TestBed } from '@angular/core/testing';

import { NetworkDataService } from './network-data.service';

describe('NetworkDataService', () => {
  let service: NetworkDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
