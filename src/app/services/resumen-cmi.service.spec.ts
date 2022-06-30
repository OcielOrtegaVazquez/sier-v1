import { TestBed } from '@angular/core/testing';

import { ResumenCMIService } from './resumen-cmi.service';

describe('ResumenCMIService', () => {
  let service: ResumenCMIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenCMIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
