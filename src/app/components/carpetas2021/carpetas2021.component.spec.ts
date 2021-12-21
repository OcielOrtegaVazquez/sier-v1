import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carpetas2021Component } from './carpetas2021.component';

describe('Carpetas2021Component', () => {
  let component: Carpetas2021Component;
  let fixture: ComponentFixture<Carpetas2021Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Carpetas2021Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carpetas2021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
