import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaInvestigacionComponent } from './carpeta-investigacion.component';

describe('CarpetaInvestigacionComponent', () => {
  let component: CarpetaInvestigacionComponent;
  let fixture: ComponentFixture<CarpetaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpetaInvestigacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpetaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
