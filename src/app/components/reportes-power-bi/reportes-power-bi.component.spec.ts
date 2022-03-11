import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPowerBiComponent } from './reportes-power-bi.component';

describe('ReportesPowerBiComponent', () => {
  let component: ReportesPowerBiComponent;
  let fixture: ComponentFixture<ReportesPowerBiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesPowerBiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesPowerBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
