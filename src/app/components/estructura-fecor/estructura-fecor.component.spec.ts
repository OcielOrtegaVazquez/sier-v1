import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraFecorComponent } from './estructura-fecor.component';

describe('EstructuraFecorComponent', () => {
  let component: EstructuraFecorComponent;
  let fixture: ComponentFixture<EstructuraFecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraFecorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraFecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
