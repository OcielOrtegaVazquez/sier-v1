import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FecorComponent } from './fecor.component';

describe('FecorComponent', () => {
  let component: FecorComponent;
  let fixture: ComponentFixture<FecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FecorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
