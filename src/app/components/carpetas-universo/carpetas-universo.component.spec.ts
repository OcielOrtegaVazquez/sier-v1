import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetasUniversoComponent } from './carpetas-universo.component';

describe('CarpetasUniversoComponent', () => {
  let component: CarpetasUniversoComponent;
  let fixture: ComponentFixture<CarpetasUniversoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarpetasUniversoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpetasUniversoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
