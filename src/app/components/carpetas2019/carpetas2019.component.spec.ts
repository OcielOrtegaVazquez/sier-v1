import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carpetas2019Component } from './carpetas2019.component';

describe('Carpetas2019Component', () => {
  let component: Carpetas2019Component;
  let fixture: ComponentFixture<Carpetas2019Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Carpetas2019Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carpetas2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
