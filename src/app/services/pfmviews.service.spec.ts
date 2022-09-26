import { TestBed } from '@angular/core/testing';

import { PFMViewsService } from './pfmviews.service';

describe('PFMViewsService', () => {
  let service: PFMViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PFMViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
