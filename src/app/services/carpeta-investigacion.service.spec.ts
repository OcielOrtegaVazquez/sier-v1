import { TestBed } from '@angular/core/testing';

import { CarpetaInvestigacionService } from './carpeta-investigacion.service';

describe('CarpetaInvestigacionService', () => {
  let service: CarpetaInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarpetaInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
